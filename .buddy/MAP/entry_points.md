🏠 [Home](../README_FOR_HUMANS.md) · [Getting Started](../GETTING_STARTED.md) · [Architecture](../ARCHITECTURE.md) · [Tech](../TECH_STACK.md) · [Integrations](../INTEGRATIONS.md) · [Repo Map](../MAP/repo_map.md) · [Links](../LINKS.md)

---

# Entry Points

> Where execution starts. Servers, CLIs — anything that runs.

## Backend

| Entry                 | File                                       | What it does                                           |
| --------------------- | ------------------------------------------ | ------------------------------------------------------ |
| **Dev server**        | `api/src/index.ts` (via `pnpm dev:api`)    | Starts Express on PORT with hot reload via `tsx watch` |
| **Production server** | `api/src/index.ts` (via `pnpm start`)      | Runs the compiled `api/dist/index.js`                  |
| **Build**             | `api/tsconfig.json` (via `pnpm build:api`) | Compiles TypeScript to `api/dist/`                     |

## Frontend

| Entry                | File                                    | What it does                                 |
| -------------------- | --------------------------------------- | -------------------------------------------- |
| **Dev server**       | `app/src/main.tsx` (via `pnpm dev:app`) | Vite dev server with HMR at `localhost:5173` |
| **Production build** | `app/` (via `pnpm build:app`)           | Vite build + `tsc` outputs to `app/dist/`    |

## Tests

| Entry                  | Command / Config                         | What it does                                                  |
| ---------------------- | ---------------------------------------- | ------------------------------------------------------------- |
| **All E2E tests**      | `npx playwright test`                    | Runs Playwright tests in `tests/` (Chromium, Firefox, WebKit) |
| **Specific test file** | `npx playwright test tests/auth.spec.ts` | Runs a single test file                                       |
| **UI mode**            | `npx playwright test --ui`               | Opens interactive Playwright test runner                      |
| **Test config**        | `playwright.config.ts`                   | Browser projects, web server setup, base URL                  |

Playwright **automatically starts** both dev servers (API on `:4000`, App on `:5173`) before running tests.

## Both at once

| Entry           | Command       | What it does                                             |
| --------------- | ------------- | -------------------------------------------------------- |
| **Dev servers** | `pnpm dev`    | Starts both API (`:4000`) and App (`:5173`) concurrently |
| **Build all**   | `pnpm build`  | Builds both workspaces                                   |
| **Lint all**    | `pnpm lint`   | ESLint on both `api/` and `app/`                         |
| **Format all**  | `pnpm format` | Prettier writes formatting to all source files           |
