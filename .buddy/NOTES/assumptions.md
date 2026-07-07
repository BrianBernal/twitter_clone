🏠 [Home](../README_FOR_HUMANS.md) · [Getting Started](../GETTING_STARTED.md) · [Architecture](../ARCHITECTURE.md) · [Tech](../TECH_STACK.md) · [Integrations](../INTEGRATIONS.md) · [Repo Map](../MAP/repo_map.md) · [Links](../LINKS.md)

---

# Assumptions

> Anything Buddy guessed at. **These are not facts.** Verify before relying on them.

## Database

- I assume the MySQL connection via socket path works on this machine. The default socket path is `/tmp/mysql_3306.sock`. If that's wrong, set a different `DB_SOCKET` in `.env` or use TCP (`DB_HOST` / `DB_PORT`) instead.
- I assume the column names in the types (`api/src/types/index.ts` and `app/src/api/types.ts`) match the actual database column names exactly.

## Development

- I assume `pnpm` is the package manager (from `package.json` and `pnpm-lock.yaml`).
- I assume the dev server runs on port 4000 by default (from `.env.example` and `api/src/config/index.ts`).

## Project intent

- This is no longer "just a learning project / toy API" — it now has a polished frontend, E2E tests, linting, formatting, and pre-commit hooks. But it's still not production-ready (in-memory auth, no CI, no deployment config).
- I assume the `AGENTS.md` file is the authoritative quick-reference for this project (it was created by a human and contains accurate summaries).

## Opencode / AI config

- I assume the `STITCH_API_KEY` environment variable is set for those who use the Stitch MCP server. The Stitch integration is optional and only used for UI design generation.
- I assume the opencode skills ecosystem (`skills-lock.json`) was auto-detected and may not all be actively used.
