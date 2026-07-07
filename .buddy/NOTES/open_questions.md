🏠 [Home](../README_FOR_HUMANS.md) · [Getting Started](../GETTING_STARTED.md) · [Architecture](../ARCHITECTURE.md) · [Tech](../TECH_STACK.md) · [Integrations](../INTEGRATIONS.md) · [Repo Map](../MAP/repo_map.md) · [Links](../LINKS.md)

---

# Open Questions

> Things Buddy couldn't figure out from the repo alone. Help fill these in!

## ✅ Recently answered

These questions were answered by commits after the last index:

- **Lint/format conventions** — ESLint (flat config, `api/` + `app/`) + Prettier (shared root config, `semi: true`, `singleQuote: true`) + Husky/lint-staged pre-commit hooks. All in place since commit `5e23b1c`.
- **Test framework** — Playwright E2E tests (`tests/`) with auth flow coverage. Config in `playwright.config.ts`. Since commit `6cd19ac`.
- **CI pipeline** — No CI config files yet. Playwright config does have `forbidOnly` and retry settings meant for CI.
- **Component styling** — Tailwind CSS v4 via `@tailwindcss/vite` plugin. No CSS Modules. Design tokens in `app/src/index.css`.
- **Frontend spec** — `app/specs/refactor.md` documents the "Chirp" redesign completely (component tree, data layer, layout specs, QA checklist).
- **Explicit export rule** — ESLint `no-restricted-syntax` enforces exports at end of file.

## Still open

- Is there a planned CI pipeline? (`.github/` folder has no workflow files but Playwright config has CI-ready settings)
- Should there be password/authentication improvements (bcrypt, JWT)?
- Should the Postman collection be version-controlled and maintained as the API spec?
- Is there any OpenAPI / Swagger documentation planned?
- Should there be rate limiting?
- Is there a production deployment target? (Docker, Vercel, Railway, etc.)
