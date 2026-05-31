🏠 [Home](./README_FOR_HUMANS.md) · [Getting Started](./GETTING_STARTED.md) · [Architecture](./ARCHITECTURE.md) · [Tech](./TECH_STACK.md) · [Integrations](./INTEGRATIONS.md) · [Repo Map](./MAP/repo_map.md) · [Links](./LINKS.md)

---

# Recent Changes (Human-Friendly)

> Updates made when you ask Buddy to "update buddy" before committing.

## 2026-05-31 — Monorepo restructure with React frontend (1 commit)

13. **`0621978` — feat: restructure into monorepo with api/ and app/** 🏗️
    - **66 files changed, 3199 insertions** — the biggest change yet!
    - Moved the entire backend from `src/` into `api/src/` (code unchanged, just relocated)
    - Created a brand-new `app/` workspace with a full React frontend:
      - Sign in / Sign up pages with auth forms
      - Feed view (paginated timeline with tweets)
      - User profile pages (`/users/$id`)
      - User directory (`/users`)
      - Auth stored in `localStorage`, sent as `Bearer` header via API client
    - Set up pnpm workspaces (`pnpm-workspace.yaml`)
    - Updated root `package.json` with workspace orchestration scripts:
      - `pnpm dev` starts both API + App concurrently
      - `pnpm dev:api` / `pnpm dev:app` for single-workspace dev
    - Vite dev server proxies `/api/**` to Express on `:4000`

## 2026-05-30 — Initial project setup (3 commits)

1. **`53a747c` — feat: initial project setup**
   - Express + TypeScript + MySQL2 skeleton
   - All routes, controllers, models, middleware, validators
   - In-memory session auth
   - Basic CRUD for users, tweets, followers, likes

2. **`6a17557` — docs: add AGENTS.md**
   - Added `AGENTS.md` with command reference and API docs

3. **`1f9923b` — docs: .env.example + fix AGENTS.md**
   - Added `.env.example` so newcomers know what env vars to set
   - Fixed the environment section in AGENTS.md

## 2026-05-30 — Buddy agent, schema files, Postman, README, and refinements (9 commits)

4. **`bad8cf8` — feat: add Buddy onboarding agent with cross-platform configs**
   - Created `.buddy/` knowledge base (all core docs, maps, indexes)
   - Added agent configs for Claude, GitHub, and Opencode

5. **`b17eec5` — feat: add Postman collection with all API endpoint examples**
   - Added `.postman-collection/twitter-clone-api.postman_collection.json`
   - Includes all endpoints: auth, users, tweets, follows, feed

6. **`c12f2c4` — refactor: extract env var destructuring in config, default port to 4000**
   - Moved `process.env` destructuring to top of `api/src/config/index.ts`
   - Changed default `PORT` from `3000` to `4000`

7. **`dba8152` — refactor: parameterize port as {{PORT}} in Postman collection**
   - Postman collection now uses `{{PORT}}` variable

8. **`e9755cb` — feat: add GET /api/getAllUsers endpoint to list all users**
   - Added `findAllUsers()` in `api/src/models/userModel.ts`
   - Added `getAllUsers` controller in `api/src/controllers/userController.ts`
   - Registered `GET /api/getAllUsers` route in `api/src/app.ts`

9. **`c2ad93f` — Add README.md**
   - Created `README.md` with project overview, setup instructions, API reference

10. **`71f165a` — feat: add database schema SQL file**
    - Added `api/src/config/sql_schema.sql` — creates `twitter_db` database
    - Tables: `users`, `tweets`, `followers`, `tweet_likes`

11. **`cd0428f` — feat: add mock data SQL file**
    - Added `api/src/config/sql_mock_data.sql` — 5 sample users, 15 tweets, likes, follows

12. **`69e6209` — docs: add database setup and getAllUsers to README**
    - Updated `README.md` with database setup instructions
    - Added `GET /api/getAllUsers` to the API reference table

**What's still missing (good first issues!):**
- No test files or test framework
- No lint/format scripts
- No CI pipeline
- No rate limiting or password hashing
