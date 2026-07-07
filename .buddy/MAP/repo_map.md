🏠 [Home](../README_FOR_HUMANS.md) · [Getting Started](../GETTING_STARTED.md) · [Architecture](../ARCHITECTURE.md) · [Tech](../TECH_STACK.md) · [Integrations](../INTEGRATIONS.md) · [Repo Map](../MAP/repo_map.md) · [Links](../LINKS.md)

---

# Repo Map

> A folder-by-folder tour of where things live and where to start reading.

## Top-level files

| File                   | Purpose                                                          |
| ---------------------- | ---------------------------------------------------------------- |
| `package.json`         | Root monorepo config — orchestrates `api/` and `app/` workspaces |
| `pnpm-workspace.yaml`  | pnpm workspace definition (lists `api/` and `app/`)              |
| `AGENTS.md`            | Quick-reference for AI agents & contributors                     |
| `README.md`            | Project README with setup instructions and API reference         |
| `eslint.config.js`     | Root ESLint config (shared rules for both workspaces)            |
| `.prettierrc`          | Prettier config (semicolons, single quotes, trailing commas)     |
| `playwright.config.ts` | Playwright E2E test config (3 browsers, auto-start dev servers)  |
| `opencode.json`        | Opencode AI agent config with MCP servers and subagents          |
| `skills-lock.json`     | Auto-detected AI skill registry lock file                        |
| `tsconfig.json`        | Root TypeScript config — references `api/` and `app/`            |

## Top-level folders

| Folder                 | Purpose                                  | Start here?                   |
| ---------------------- | ---------------------------------------- | ----------------------------- |
| `api/`                 | **Backend — Express REST API**           | ✅ **Yes** — all server code  |
| `app/`                 | **Frontend — React web app**             | ✅ **Yes** — all client code  |
| `tests/`               | **Playwright E2E tests**                 | 🔧 Read if running tests      |
| `.buddy/`              | AI agent knowledge base                  | ℹ️ Read if you want repo docs |
| `.opencode/`           | Opencode AI agent config + skills        | ℹ️ Read if you use Opencode   |
| `.agents/`             | AI agent skills (look-and-feel, etc.)    | ℹ️ Skills ecosystem           |
| `.claude/`             | Claude Code agent config                 | ℹ️ Claude users               |
| `.github/`             | GitHub agent config                      | ℹ️ GitHub users               |
| `.postman-collection/` | Postman API collection for all endpoints | 🔧 Use for API testing        |
| `specs/`               | Spec-driven development docs             | ℹ️ Architecture specs         |

## Inside `api/` — the backend

| Subfolder          | Purpose                                                   | Key files                                                                                                  |
| ------------------ | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `src/routes/`      | Define API endpoints and wire middleware                  | `authRoutes.ts`, `tweetRoutes.ts`, `userRoutes.ts`, `followRoutes.ts`                                      |
| `src/controllers/` | Handle requests, call models, send responses              | `authController.ts`, `tweetController.ts`, `userController.ts`, `followController.ts`, `likeController.ts` |
| `src/models/`      | SQL queries — the database layer                          | `userModel.ts`, `tweetModel.ts`, `followModel.ts`, `likeModel.ts`                                          |
| `src/middleware/`  | Auth, validation, error handling                          | `auth.ts`, `validation.ts`, `errorHandler.ts`                                                              |
| `src/validators/`  | Per-route input validation functions                      | `authValidator.ts`, `tweetValidator.ts`, `helpers.ts`                                                      |
| `src/config/`      | App config, DB pool, validation flags, schema + mock data | `index.ts`, `sql_schema.sql`, `sql_mock_data.sql`                                                          |
| `src/types/`       | Shared TypeScript interfaces                              | `index.ts`                                                                                                 |
| `src/app.ts`       | Express app setup (routes, middleware)                    | Entry point for the app                                                                                    |
| `src/index.ts`     | Server startup (listens on PORT)                          | Entry point for the server                                                                                 |

## Inside `app/` — the frontend

| Subfolder                | Purpose                                             | Key files                                                                                                                                                |
| ------------------------ | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/routes/`            | TanStack Router — page components per URL path      | `index.tsx` (feed), `signin.tsx`, `signup.tsx`, `following.tsx`, `followers.tsx`, `users.index.tsx` (directory), `users.$id.tsx` (profile), `__root.tsx` |
| `src/components/layout/` | Layout components — 3-column grid, nav, mobile      | `RootLayout.tsx`, `LeftSidebar.tsx`, `RightSidebar.tsx`, `MobileNav.tsx`, `MobileDrawer.tsx`                                                             |
| `src/components/tweets/` | Tweet-specific UI                                   | `TweetCard.tsx`, `ComposeModal.tsx`                                                                                                                      |
| `src/components/users/`  | User-related UI                                     | `UserCard.tsx`                                                                                                                                           |
| `src/components/ui/`     | Generic UI components                               | `Toast.tsx` (ToastProvider + useToast context)                                                                                                           |
| `src/hooks/`             | Custom React hooks (TanStack Query wrappers)        | `useAuth.ts`, `useFeed.ts`, `useTweets.ts`, `useUsers.ts`                                                                                                |
| `src/api/`               | HTTP client and TypeScript types for the API        | `client.ts`, `types.ts`                                                                                                                                  |
| `src/main.tsx`           | React entry point — QueryClient + Toast + Router    |                                                                                                                                                          |
| `src/index.css`          | Tailwind v4 entry + Midnight Velocity design tokens |                                                                                                                                                          |
| `src/routeTree.gen.ts`   | Auto-generated by TanStack Router (gitignored)      |                                                                                                                                                          |

## Inside `tests/` — E2E tests

| File              | Purpose                                             |
| ----------------- | --------------------------------------------------- |
| `auth.spec.ts`    | Authentication flow tests (signup, signin, signout) |
| `example.spec.ts` | Playwright example test (placeholder)               |
| `seed.spec.ts`    | Test seed/placeholder                               |

## Where to start reading code

### Backend (API)

1. **`api/src/app.ts`** — See all routes wired up at a glance.
2. **`api/src/routes/authRoutes.ts`** — Follow a simple flow (signup).
3. **`api/src/controllers/authController.ts`** — See how controllers work.
4. **`api/src/models/userModel.ts`** — See how database queries work.
5. **`api/src/middleware/auth.ts`** — Understand the auth system.

### Frontend (App)

1. **`app/src/main.tsx`** — See how the app is wired (QueryClient, Toast, Router).
2. **`app/src/components/layout/RootLayout.tsx`** — Understand the 3-column layout.
3. **`app/src/routes/index.tsx`** — The feed page (main view).
4. **`app/src/hooks/useAuth.ts`** — See how auth works on the client.
5. **`app/src/api/client.ts`** — See how the app talks to the API.
6. **`app/src/components/ui/Toast.tsx`** — The error notification system.
7. **`app/src/index.css`** — Tailwind v4 design tokens ("Midnight Velocity").
