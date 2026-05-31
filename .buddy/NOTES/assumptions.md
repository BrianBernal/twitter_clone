🏠 [Home](../README_FOR_HUMANS.md) · [Getting Started](../GETTING_STARTED.md) · [Architecture](../ARCHITECTURE.md) · [Tech](../TECH_STACK.md) · [Integrations](../INTEGRATIONS.md) · [Repo Map](../MAP/repo_map.md) · [Links](../LINKS.md)

---

# Assumptions

> Anything Buddy guessed at. **These are not facts.** Verify before relying on them.

## Database

- I assume the MySQL connection via socket path works on this machine. The default socket path is `/tmp/mysql_3306.sock`. If that's wrong, set a different `DB_SOCKET` in `.env` or use TCP (`DB_HOST` / `DB_PORT`) instead.
- I assume the column names in the types (`src/types/index.ts`) match the actual database column names exactly.

## Development

- I assume `pnpm` is the package manager (from `package.json` and `pnpm-lock.yaml`).
- I assume the dev server runs on port 4000 by default (from `.env.example` and `src/config/index.ts`).

## Project intent

- I assume this is a learning project / toy API, not meant for production use (in-memory auth, no tests, no CI).
- I assume the `AGENTS.md` file is the authoritative quick-reference for this project (it was created by a human and contains accurate summaries).
