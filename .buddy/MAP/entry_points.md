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

## Both at once

| Entry           | Command      | What it does                                             |
| --------------- | ------------ | -------------------------------------------------------- |
| **Dev servers** | `pnpm dev`   | Starts both API (`:4000`) and App (`:5173`) concurrently |
| **Build all**   | `pnpm build` | Builds both workspaces                                   |
