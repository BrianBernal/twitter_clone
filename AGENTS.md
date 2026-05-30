# twitter-clone-api

## Commands

| Command | What it does |
|---------|-------------|
| `pnpm dev` | Dev server with hot reload via `tsx watch src/index.ts` |
| `pnpm build` | `tsc` — outputs ESM to `dist/` |
| `pnpm start` | `node dist/index.js` |

No test/lint/format scripts exist yet.

## Architecture

- **ESM** (`"type": "module"` in `package.json`) — all local imports **must** use `.js` extensions (e.g. `'../config/index.js'`).
- **In-memory session auth** (`src/middleware/auth.ts`): `authMiddleware` reads `Authorization: Bearer <token>`, sets `req.userId`. Tokens are `crypto.randomUUID()` stored in a `Map`. No JWT, no bcrypt — sessions are lost on restart.
- **Config-driven validation** (`src/config/index.ts`): each route's validation can be toggled via `validationFlags` map. `validationMiddleware` and `validateParam` check `isValidationEnabled()` before running validators.
- **Response format**: all endpoints return `{ data: ... }` on success, `{ error: "..." }` on errors. `errorHandler` catches unhandled errors with a 500.
- **Feed pagination**: `?limit=N&offset=O`. Limit clamped to 1–100 (default 20). Offset defaults to 0.
- **MySQL2** via socket path (`/tmp/mysql_3306.sock` by default). Pool is lazy-initialized on first query. No migration files — database schema is assumed to exist.

## API Routes

| Prefix | File | Notes |
|--------|------|-------|
| `POST /api/auth/signup` | `authRoutes` | Validates handle, email, name; 409 on duplicate |
| `POST /api/auth/signin` | `authRoutes` | Email-only auth, returns session token |
| `POST /api/auth/signout` | `authRoutes` | Destroys in-memory session |
| `GET /api/users/:id` | `userRoutes` | All user routes require auth |
| `GET /api/users/:id/followers` | `userRoutes` | Requires auth |
| `GET /api/users/:id/following` | `userRoutes` | Requires auth |
| `POST /api/tweets` | `tweetRoutes` | Requires auth, max 280 chars |
| `DELETE /api/tweets/:id` | `tweetRoutes` | Owner-only (403 if not author) |
| `POST /api/tweets/:id/like` | `tweetRoutes` | Requires auth |
| `DELETE /api/tweets/:id/like` | `tweetRoutes` | Requires auth |
| `GET /api/tweets/:id/likes` | `tweetRoutes` | Requires auth |
| `POST /api/followers` | `followRoutes` | Requires auth, cannot follow self |
| `DELETE /api/followers/:following_id` | `followRoutes` | Requires auth |
| `GET /api/feed` | `app.ts` inline | Requires auth, paginated |

## Environment

`.env` is gitignored with dev defaults. See `.env.example` for required vars. Uses MySQL socket connection by default.
