🏠 [Home](./README_FOR_HUMANS.md) · [Getting Started](./GETTING_STARTED.md) · [Architecture](./ARCHITECTURE.md) · [Tech](./TECH_STACK.md) · [Integrations](./INTEGRATIONS.md) · [Repo Map](./MAP/repo_map.md) · [Links](./LINKS.md)

---

# Tech Stack

## Languages

- **TypeScript** (all source code in `src/`)
- **ECMAScript 2022** (`"target": "ES2022"` in tsconfig)
- **ESM** (`"type": "module"` in package.json — local imports use `.js` extensions)

## Frameworks & libraries

| Technology | What it's used for | File |
|---|---|---|
| **Express** (^4.21) | HTTP server, routing, middleware | `package.json` |
| **mysql2** (^3.11) | MySQL database driver (with `Promise` API) | `package.json` |

## Build & package

| Tool | Purpose |
|---|---|
| **TypeScript** (`tsc`) | Compiles `.ts` → `.js` to `dist/` |
| **tsx** (^4.19) | Dev server with hot reload (`tsx watch src/index.ts`) |
| **pnpm** | Package manager (faster than npm) |

## Tests

**None yet.** There are no test files, no test framework, no test scripts defined.

## CI / Deploy

**None yet.** No CI config files found (`.github/` folder exists but no workflow files — it just has `FUNDING.yml` and `.keep`).

## Key TypeScript config details

| Setting | Value | Why it matters |
|---|---|---|
| `moduleResolution` | `bundler` | Lets you use `.js` extensions in imports (tsx & tsc both support this) |
| `strict` | `true` | Full type checking enabled |
| `outDir` | `./dist` | Compiled JS goes here |
