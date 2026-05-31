🏠 [Home](./README_FOR_HUMANS.md) · [Getting Started](./GETTING_STARTED.md) · [Architecture](./ARCHITECTURE.md) · [Tech](./TECH_STACK.md) · [Integrations](./INTEGRATIONS.md) · [Repo Map](./MAP/repo_map.md) · [Links](./LINKS.md)

---

# Tech Stack

## Languages

- **TypeScript** (all source code in `api/` and `app/`)
- **ECMAScript 2022** (`"target": "ES2022"` in tsconfig)
- **ESM** (`"type": "module"` in both workspaces — local imports use `.js` extensions)

## Backend (`api/`)

| Technology          | What it's used for                         |
| ------------------- | ------------------------------------------ |
| **Express** (^4.21) | HTTP server, routing, middleware           |
| **mysql2** (^3.11)  | MySQL database driver (with `Promise` API) |

## Frontend (`app/`)

| Technology                   | What it's used for                          |
| ---------------------------- | ------------------------------------------- |
| **React** (^19.2)            | UI library                                  |
| **Vite** (^8.0)              | Build tool and dev server with HMR          |
| **TanStack Router** (^1.170) | File-based routing                          |
| **TanStack Query** (^5.100)  | Server state — fetching, caching, mutations |
| **CSS Modules**              | Scoped component styles (`*.module.css`)    |

## Build & package

| Tool                   | Purpose                           |
| ---------------------- | --------------------------------- |
| **TypeScript** (`tsc`) | Compiles `.ts` → `.js`            |
| **tsx** (^4.19)        | API dev server with hot reload    |
| **Vite** (^8.0)        | App dev server + production build |
| **pnpm**               | Package manager (workspaces)      |

## Tests

**None yet.** No test files, no test framework, no test scripts defined.

## CI / Deploy

**None yet.** No CI config files found.

## Key TypeScript config details

| Setting            | Value     | Why it matters                           |
| ------------------ | --------- | ---------------------------------------- |
| `moduleResolution` | `bundler` | Lets you use `.js` extensions in imports |
| `strict`           | `true`    | Full type checking enabled               |
