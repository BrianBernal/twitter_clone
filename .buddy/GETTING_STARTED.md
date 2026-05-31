🏠 [Home](./README_FOR_HUMANS.md) · [Getting Started](./GETTING_STARTED.md) · [Architecture](./ARCHITECTURE.md) · [Tech](./TECH_STACK.md) · [Integrations](./INTEGRATIONS.md) · [Repo Map](./MAP/repo_map.md) · [Links](./LINKS.md)

---

# Getting Started

## Prerequisites

- **Node.js** v18 or newer
- **pnpm** — the package manager (install: `npm install -g pnpm`)
- **MySQL** — running locally on port 3306 (or via socket at `/tmp/mysql_3306.sock`)

## Database setup

This project expects a MySQL database named `twitter_db`.

1. Make sure MySQL is running.

2. Create the database and tables:

```bash
mysql -u root < api/src/config/sql_schema.sql
```

This runs `api/src/config/sql_schema.sql` which:
- Creates `twitter_db` if it doesn't exist
- Creates `users`, `tweets`, `followers`, `tweet_likes` tables
- Adds indexes and foreign keys with `ON DELETE CASCADE`

3. (Optional) Load mock data to play with:

```bash
mysql -u root < api/src/config/sql_mock_data.sql
```

This adds 5 users, 15 tweets, likes, and follow relationships so you can test the API right away.

## Install dependencies

```bash
pnpm install
```

## Configure environment

```bash
# Copy the example .env file (it already has good defaults)
cp api/.env.example api/.env
```

Edit `api/.env` to match your MySQL setup if needed:

| Variable      | Default                 | What it is                 |
|---------------|-------------------------|----------------------------|
| `PORT`        | 4000                    | Port the API listens on    |
| `DB_HOST`     | 127.0.0.1               | MySQL host                 |
| `DB_PORT`     | 3306                    | MySQL port                 |
| `DB_USER`     | root                    | MySQL user                 |
| `DB_PASSWORD` | *(empty)*               | MySQL password             |
| `DB_NAME`     | twitter_db              | Database name              |
| `DB_SOCKET`   | /tmp/mysql_3306.sock    | MySQL socket path          |

## Run locally (dev mode)

```bash
pnpm dev
```

This starts **both** the API and App dev servers:
- **API** at `http://localhost:4000` (hot reload via `tsx watch`)
- **App** at `http://localhost:5173` (Vite HMR — opens in browser)

The Vite dev server proxies `/api/**` requests to `http://localhost:4000`, so you only need to open the app URL.

### Running just one

```bash
pnpm dev:api     # API only (port 4000)
pnpm dev:app     # App only (port 5173)
```

## Build for production

```bash
pnpm build
```

Compiles both workspaces:
- API: TypeScript → `api/dist/`
- App: Vite build + TypeScript → `app/dist/`

## Run production build

```bash
pnpm start
```

Runs `node api/dist/index.js` (API only — the app is served by Vite in dev or a static server in production).

## Quick smoke test (using curl)

Open a new terminal and try these:

```bash
# Sign up a user
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"user_handle":"alice","email_address":"alice@test.com","first_name":"Alice","last_name":"Smith"}'

# Sign in (get a session token)
curl -X POST http://localhost:4000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email_address":"alice@test.com"}'

# Create a tweet (replace TOKEN with your session token)
curl -X POST http://localhost:4000/api/tweets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"tweet_text":"Hello from Buddy!"}'
```

## Common problems

| Problem | Likely fix |
|---------|-----------|
| `ECONNREFUSED` on MySQL | Make sure MySQL is running. Check `DB_HOST`, `DB_PORT` in `api/.env`. |
| `Unknown database 'twitter_db'` | Run `mysql -u root < api/src/config/sql_schema.sql` to create the database and tables. |
| `ERR_MODULE_NOT_FOUND` for `.js` imports | This is an ESM project. All local imports use `.js` extensions. That's correct — `tsx` and `tsc` handle the `.ts` → `.js` mapping. |
| `SyntaxError` on startup | Make sure you have Node 18+ (uses `crypto.randomUUID()`). |

## Where things live

- **API config:** `api/.env` (gitignored) + `api/src/config/index.ts`
- **Backend source:** TypeScript in `api/src/`
- **Frontend source:** TypeScript/React in `app/src/`
- **Database schema:** `api/src/config/sql_schema.sql`
- **Mock data:** `api/src/config/sql_mock_data.sql`
- **API testing:** `.postman-collection/twitter-clone-api.postman_collection.json`
- **Agent configs:** `.opencode/agents/buddy.md`
