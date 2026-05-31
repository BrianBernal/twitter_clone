🏠 [Home](./README_FOR_HUMANS.md) · [Getting Started](./GETTING_STARTED.md) · [Architecture](./ARCHITECTURE.md) · [Tech](./TECH_STACK.md) · [Integrations](./INTEGRATIONS.md) · [Repo Map](./MAP/repo_map.md) · [Links](./LINKS.md)

---

# External Integrations

## MySQL Database

This is the **only** external service the project connects to.

| Detail           | Value                                                  |
| ---------------- | ------------------------------------------------------ |
| Driver           | `mysql2` (with Promise API)                            |
| Connection       | Connection pool, lazy-initialized on first query       |
| Default host     | `127.0.0.1` (or Unix socket at `/tmp/mysql_3306.sock`) |
| Default port     | 3306                                                   |
| Default database | `twitter_db`                                           |

### Where configured

- **Environment variables:** `api/.env` file (gitignored) — see `.env.example` for template
- **Pool setup:** `api/src/config/index.ts` — `getPool()` function creates the pool
- **Connection details:** Read from `process.env` at startup
- **Schema definition:** `api/src/config/sql_schema.sql`
- **Mock data:** `api/src/config/sql_mock_data.sql`

### Tables used

| Table         | Purpose                                             |
| ------------- | --------------------------------------------------- |
| `users`       | User profiles (handle, name, email, follower_count) |
| `tweets`      | Tweet content, likes count, author                  |
| `followers`   | Who follows whom                                    |
| `tweet_likes` | Who liked which tweet                               |

## Auth

**No external auth provider.** Sessions are completely in-memory using `crypto.randomUUID()` tokens stored in a `Map<string, number>` in `api/src/middleware/auth.ts`. No JWT, no OAuth, no bcrypt.

## Frontend API client

The `app/` workspace talks to the API via a plain `fetch` wrapper at `app/src/api/client.ts`. It reads the auth token from `localStorage` and injects it as `Authorization: Bearer`. During development, Vite proxies `/api/**` requests to `http://localhost:4000`.

## Secrets & env vars

All secrets live in `api/.env` (gitignored). Template in `api/.env.example`.

| Variable      | Type   | Secret? |
| ------------- | ------ | ------- |
| `PORT`        | number | No      |
| `DB_HOST`     | string | No      |
| `DB_PORT`     | number | No      |
| `DB_USER`     | string | Maybe   |
| `DB_PASSWORD` | string | **Yes** |
| `DB_NAME`     | string | No      |
| `DB_SOCKET`   | string | No      |
