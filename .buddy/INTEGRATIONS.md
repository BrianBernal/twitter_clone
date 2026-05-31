🏠 [Home](./README_FOR_HUMANS.md) · [Getting Started](./GETTING_STARTED.md) · [Architecture](./ARCHITECTURE.md) · [Tech](./TECH_STACK.md) · [Integrations](./INTEGRATIONS.md) · [Repo Map](./MAP/repo_map.md) · [Links](./LINKS.md)

---

# External Integrations

## MySQL Database

This is the **only** external service the project connects to.

| Detail | Value |
|---|---|
| Driver | `mysql2` (with Promise API) |
| Connection | Connection pool, lazy-initialized on first query |
| Default host | `127.0.0.1` (or Unix socket at `/tmp/mysql_3306.sock`) |
| Default port | 3306 |
| Default database | `twitter_db` |

### Where configured

- **Environment variables:** `.env` file (gitignored) — see `.env.example` for template (default `PORT` is now `4000`)
- **Pool setup:** `src/config/index.ts` — `getPool()` function creates the pool
- **Connection details:** Read from `process.env` at startup (destructured at top of `src/config/index.ts`)
- **Schema definition:** `src/config/sql_schema.sql` — run this to create database + tables
- **Mock data:** `src/config/sql_mock_data.sql` — optional seed data for development

### Tables used

| Table | Purpose | Created by |
|---|---|---|---|
| `users` | User profiles (handle, name, email, follower_count) | `src/config/sql_schema.sql` (run via `mysql -u root < src/config/sql_schema.sql`) |
| `tweets` | Tweet content, likes count, author | Same schema file — FK `ON DELETE CASCADE` to `users` |
| `followers` | Who follows whom | Same schema file — both FKs `ON DELETE CASCADE` |
| `tweet_likes` | Who liked which tweet | Same schema file — both FKs `ON DELETE CASCADE` |

## Auth

**No external auth provider.** Sessions are completely in-memory using `crypto.randomUUID()` tokens stored in a `Map<string, number>` in `src/middleware/auth.ts`. No JWT, no OAuth, no bcrypt.

## Secrets & env vars

All secrets live in `.env` at the repo root (gitignored). Template in `.env.example`.

| Variable | Type | Secret? |
|---|---|---|
| `PORT` | number | No |
| `DB_HOST` | string | No |
| `DB_PORT` | number | No |
| `DB_USER` | string | Maybe |
| `DB_PASSWORD` | string | **Yes** |
| `DB_NAME` | string | No |
| `DB_SOCKET` | string | No |
