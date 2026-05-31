# Twitter Clone Monorepo

## Commands

| Command             | What it does                                     |
| ------------------- | ------------------------------------------------ |
| `pnpm dev`          | Starts both API and App dev servers concurrently |
| `pnpm dev:api`      | API dev server via `tsx watch api/src/index.ts`  |
| `pnpm dev:app`      | App dev server via `vite` with HMR               |
| `pnpm build`        | Builds both API and App for production           |
| `pnpm build:api`    | `tsc` — outputs ESM to `api/dist/`               |
| `pnpm build:app`    | `vite build && tsc` — outputs to `app/dist/`     |
| `pnpm start`        | `node api/dist/index.js`                         |
| `pnpm lint`         | ESLint on both `api/` and `app/`                 |
| `pnpm lint:fix`     | ESLint with auto-fix on both packages            |
| `pnpm format`       | Prettier — writes formatting to all source files |
| `pnpm format:check` | Prettier — checks formatting (for CI)            |

## Monorepo structure

- **`api/`** — Express + MySQL2 backend (ESM, TypeScript)
- **`app/`** — React + Vite + TanStack frontend
- **Root** — pnpm workspace orchestration (`pnpm-workspace.yaml`)

## Architecture (API)

- **ESM** (`"type": "module"` in `api/package.json`) — all local imports **must** use `.js` extensions (e.g. `'../config/index.js'`).
- **In-memory session auth** (`api/src/middleware/auth.ts`): `authMiddleware` reads `Authorization: Bearer <token>`, sets `req.userId`. Tokens are `crypto.randomUUID()` stored in a `Map`. No JWT, no bcrypt — sessions are lost on restart.
- **Config-driven validation** (`api/src/config/index.ts`): each route's validation can be toggled via `validationFlags` map. `validationMiddleware` and `validateParam` check `isValidationEnabled()` before running validators.
- **Response format**: all endpoints return `{ data: ... }` on success, `{ error: "..." }` on errors. `errorHandler` catches unhandled errors with a 500.
- **Feed pagination**: `?limit=N&offset=O`. Limit clamped to 1–100 (default 20). Offset defaults to 0.
- **MySQL2** via socket path (`/tmp/mysql_3306.sock` by default). Pool is lazy-initialized on first query. No migration files — database schema is assumed to exist.

## Architecture (App)

- **Vite** dev server proxies `/api/**` to `http://localhost:4000`
- **TanStack Router** with file-based routing (`src/routes/`)
- **TanStack Query** for server state (fetches, mutations, cache invalidation)
- **CSS Modules** via `*.module.css` files (zero-config in Vite)
- Auth token stored in `localStorage`, sent as `Authorization: Bearer` header

## API Routes

| Prefix                                | File            | Notes                                                    |
| ------------------------------------- | --------------- | -------------------------------------------------------- |
| `POST /api/auth/signup`               | `authRoutes`    | Validates handle, email, name; 409 on duplicate          |
| `POST /api/auth/signin`               | `authRoutes`    | Email-only auth (`email_address`), returns session token |
| `POST /api/auth/signout`              | `authRoutes`    | Destroys in-memory session                               |
| `GET /api/users/:id`                  | `userRoutes`    | All user routes require auth                             |
| `GET /api/users/:id/followers`        | `userRoutes`    | Requires auth                                            |
| `GET /api/users/:id/following`        | `userRoutes`    | Requires auth                                            |
| `GET /api/getAllUsers`                | `userRoutes`    | Requires auth                                            |
| `POST /api/tweets`                    | `tweetRoutes`   | Requires auth, max 280 chars                             |
| `DELETE /api/tweets/:id`              | `tweetRoutes`   | Owner-only (403 if not author)                           |
| `POST /api/tweets/:id/like`           | `tweetRoutes`   | Requires auth                                            |
| `DELETE /api/tweets/:id/like`         | `tweetRoutes`   | Requires auth                                            |
| `GET /api/tweets/:id/likes`           | `tweetRoutes`   | Requires auth                                            |
| `POST /api/followers`                 | `followRoutes`  | Requires auth, cannot follow self                        |
| `DELETE /api/followers/:following_id` | `followRoutes`  | Requires auth                                            |
| `GET /api/feed`                       | `app.ts` inline | Requires auth, paginated                                 |

## App Routes (Frontend)

| Path         | File              | Notes                                          |
| ------------ | ----------------- | ---------------------------------------------- |
| `/`          | `index.tsx`       | Feed (redirects to /signin if unauthenticated) |
| `/signin`    | `signin.tsx`      | Sign in form                                   |
| `/signup`    | `signup.tsx`      | Sign up form                                   |
| `/users`     | `users.index.tsx` | User directory                                 |
| `/users/$id` | `users.$id.tsx`   | User profile                                   |

## Environment

`.env` is gitignored with dev defaults. See `.env.example` for required vars. Uses MySQL socket connection by default.
