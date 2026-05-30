🏠 [Home](../README_FOR_HUMANS.md) · [Getting Started](../GETTING_STARTED.md) · [Architecture](../ARCHITECTURE.md) · [Tech](../TECH_STACK.md) · [Integrations](../INTEGRATIONS.md) · [Repo Map](../MAP/repo_map.md) · [Links](../LINKS.md)

---

# Entry Points

> Where execution starts. Servers, CLIs, jobs, schedulers — anything that runs.

| Entry | File | What it does |
|---|---|---|
| **Dev server** | `src/index.ts` (via `pnpm dev`) | Starts Express on PORT with hot reload via `tsx watch` |
| **Production server** | `src/index.ts` (via `pnpm start`) | Runs the compiled `dist/index.js` |
| **Build** | `tsconfig.json` (via `pnpm build`) | Compiles TypeScript to `dist/` |
