🏠 [Home](./README_FOR_HUMANS.md) · [Getting Started](./GETTING_STARTED.md) · [Architecture](./ARCHITECTURE.md) · [Tech](./TECH_STACK.md) · [Integrations](./INTEGRATIONS.md) · [Repo Map](./MAP/repo_map.md) · [Links](./LINKS.md)

---

# Tech Stack

## Languages

- **TypeScript** (all source code in `api/` and `app/`)
- **ECMAScript 2022** (`"target": "ES2022"` in tsconfig)
- **ESM** (`"type": "module"` in both workspaces — local imports use `.js` extensions in the API)

## Backend (`api/`)

| Technology          | What it's used for                         |
| ------------------- | ------------------------------------------ |
| **Express** (^4.21) | HTTP server, routing, middleware           |
| **mysql2** (^3.11)  | MySQL database driver (with `Promise` API) |

## Frontend (`app/`)

| Technology                           | What it's used for                                 |
| ------------------------------------ | -------------------------------------------------- |
| **React** (^19.2)                    | UI library                                         |
| **Vite** (^8.0)                      | Build tool and dev server with HMR                 |
| **TanStack Router** (^1.170)         | File-based routing with auto-generated route tree  |
| **TanStack Query** (^5.100)          | Server state — fetching, caching, mutations        |
| **Tailwind CSS v4**                  | Utility-first CSS via `@tailwindcss/vite` plugin   |
| **@tanstack/router-plugin** (^1.168) | Auto-generates `routeTree.gen.ts` from route files |

The project was **refactored from CSS Modules to Tailwind CSS v4** in July 2026. All styling now uses Tailwind utility classes. The design system ("Midnight Velocity") is defined as CSS theme tokens in `app/src/index.css`.

## Build & package

| Tool                   | Purpose                           |
| ---------------------- | --------------------------------- |
| **TypeScript** (`tsc`) | Compiles `.ts` → `.js`            |
| **tsx** (^4.19)        | API dev server with hot reload    |
| **Vite** (^8.0)        | App dev server + production build |
| **pnpm**               | Package manager (workspaces)      |

## Testing

| Technology             | What it's used for                            |
| ---------------------- | --------------------------------------------- |
| **Playwright** (^1.60) | E2E browser tests — Chromium, Firefox, WebKit |

Tests live in `tests/`. Playwright config in `playwright.config.ts` starts both API and App dev servers automatically before running.

**Test scripts** (not in `package.json` yet — run with `npx playwright test`):

```bash
npx playwright test              # Run all tests (headed by default in CI, headless otherwise)
npx playwright test --headed     # Run tests in visible browser
npx playwright test --ui         # Run tests in Playwright UI mode
npx playwright test tests/auth.spec.ts  # Run a specific test file
```

## Lint & Format

| Technology            | What it's used for                                           |
| --------------------- | ------------------------------------------------------------ |
| **ESLint** (^10.4)    | Linting with TypeScript rules (`tseslint`)                   |
| **Prettier** (^3.8)   | Code formatting (semicolons, single quotes, trailing commas) |
| **Husky** (^9.1)      | Git pre-commit hooks                                         |
| **lint-staged** (^17) | Runs linters on staged files only                            |

Commands:

```bash
pnpm lint          # ESLint on both api/ and app/
pnpm lint:fix      # ESLint with auto-fix
pnpm format        # Prettier — writes formatting to all source files
pnpm format:check  # Prettier — checks formatting (for CI)
pnpm prepare       # Installs Husky git hooks (auto-runs on `pnpm install`)
```

**ESLint has a custom rule**: `no-restricted-syntax` — all exports must be at the **end** of the file, not inline with declarations. See `eslint.config.js`.

## CI / Deploy

**None yet.** No CI config files found (`.github/` has no workflow files).

## Key TypeScript config details

| Setting            | Value     | Why it matters                           |
| ------------------ | --------- | ---------------------------------------- |
| `moduleResolution` | `bundler` | Lets you use `.js` extensions in imports |
| `strict`           | `true`    | Full type checking enabled               |

## Skills ecosystem (AI agent skills)

The repo bundles reusable AI agent skills for code generation:

| Location            | Skills included                                                                                                                                                                                                            |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.agents/skills/`   | accessibility, composition-patterns, frontend-design, look-and-feel (Midnight Velocity), nodejs-backend-patterns, nodejs-best-practices, nodejs-express-server, react-best-practices, seo, typescript-advanced-types, vite |
| `.opencode/skills/` | tailwind-design-system, tanstack-query, tanstack-router                                                                                                                                                                    |

Managed via `skills-lock.json`.
