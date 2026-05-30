🏠 [Home](../README_FOR_HUMANS.md) · [Getting Started](../GETTING_STARTED.md) · [Architecture](../ARCHITECTURE.md) · [Tech](../TECH_STACK.md) · [Integrations](../INTEGRATIONS.md) · [Repo Map](../MAP/repo_map.md) · [Links](../LINKS.md)

---

# Repo Map

> A folder-by-folder tour of where things live and where to start reading.

## Top-level files

| File | Purpose |
|---|---|
| `package.json` | Project config, scripts, dependencies |
| `tsconfig.json` | TypeScript compiler settings |
| `.env` / `.env.example` | Environment variables (DB config, port) |
| `AGENTS.md` | Quick-reference for AI agents & contributors |
| `pnpm-lock.yaml` | Lockfile — don't edit manually |

## Top-level folders

| Folder | Purpose | Start here? |
|---|---|---|
| `src/` | **All source code** | ✅ **Yes — this is where everything lives** |
| `.buddy/` | AI agent knowledge base | ℹ️ Read if you want repo docs |
| `.claude/` | Claude AI config | Ignore unless you use Claude |
| `.opencode/` | Opencode AI config | Ignore unless you use Opencode |
| `.github/` | GitHub templates/CI (currently empty) | Ignore for now |
| `node_modules/` | Dependencies (gitignored) | Never touch |
| `dist/` | Compiled JS output (gitignored) | Never touch |

## Inside `src/` — the code

| Subfolder | Purpose | Key files |
|---|---|---|
| `routes/` | Define API endpoints and wire middleware | `authRoutes.ts`, `tweetRoutes.ts`, `userRoutes.ts`, `followRoutes.ts` |
| `controllers/` | Handle requests, call models, send responses | `authController.ts`, `tweetController.ts`, `userController.ts`, `followController.ts`, `likeController.ts` |
| `models/` | SQL queries — the database layer | `userModel.ts`, `tweetModel.ts`, `followModel.ts`, `likeModel.ts` |
| `middleware/` | Auth, validation, error handling | `auth.ts`, `validation.ts`, `errorHandler.ts` |
| `validators/` | Per-route input validation functions | `authValidator.ts`, `tweetValidator.ts`, `helpers.ts` |
| `config/` | App config, DB pool, validation flags | `index.ts` |
| `types/` | Shared TypeScript interfaces | `index.ts` |
| `app.ts` | Express app setup (routes, middleware) | Entry point for the app |
| `index.ts` | Server startup (listens on PORT) | Entry point for the server |

## Where to start reading code

1. **`src/app.ts`** — See all routes wired up at a glance.
2. **`src/routes/authRoutes.ts`** — Follow a simple flow (signup).
3. **`src/controllers/authController.ts`** — See how controllers work.
4. **`src/models/userModel.ts`** — See how database queries work.
5. **`src/middleware/auth.ts`** — Understand the auth system.
6. **`src/middleware/validation.ts`** — Understand input validation.
