🏠 [Home](./README_FOR_HUMANS.md) · [Getting Started](./GETTING_STARTED.md) · [Architecture](./ARCHITECTURE.md) · [Tech](./TECH_STACK.md) · [Integrations](./INTEGRATIONS.md) · [Repo Map](./MAP/repo_map.md) · [Links](./LINKS.md)

---

# Getting Started

## Prerequisites

- **Node.js** v18 or newer (uses ES2022 features)
- **pnpm** — the package manager (install: `npm install -g pnpm`)
- **MySQL** — running locally on port 3306 (or via socket at `/tmp/mysql_3306.sock`)

## Database setup

This project expects a MySQL database. There are no migration files — you need to create the database and tables yourself.

1. Make sure MySQL is running.

2. Create the database:

```sql
CREATE DATABASE twitter_db;
```

3. Create the tables:

```sql
-- Users table
CREATE TABLE twitter_db.users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  user_handle VARCHAR(50) NOT NULL UNIQUE,
  email_address VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone_number VARCHAR(20),
  follower_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tweets table
CREATE TABLE twitter_db.tweets (
  tweet_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  tweet_text VARCHAR(280) NOT NULL,
  likes_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Followers table
CREATE TABLE twitter_db.followers (
  follower_id INT NOT NULL,
  following_id INT NOT NULL,
  PRIMARY KEY (follower_id, following_id),
  FOREIGN KEY (follower_id) REFERENCES users(user_id),
  FOREIGN KEY (following_id) REFERENCES users(user_id)
);

-- Tweet likes table
CREATE TABLE twitter_db.tweet_likes (
  user_id INT NOT NULL,
  tweet_id INT NOT NULL,
  PRIMARY KEY (user_id, tweet_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (tweet_id) REFERENCES tweets(tweet_id)
);
```

## Install dependencies

```bash
pnpm install
```

## Configure environment

```bash
# Copy the example .env file (it already has good defaults)
cp .env.example .env
```

Edit `.env` to match your MySQL setup if needed:

| Variable      | Default                 | What it is                 |
|---------------|-------------------------|----------------------------|
| `PORT`        | 3000                    | Port the server listens on |
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

This starts the server with hot reload at `http://localhost:3000`. Any file changes auto-restart the server.

## Build for production

```bash
pnpm build
```

Compiles TypeScript to JavaScript in the `dist/` folder.

## Run production build

```bash
pnpm start
```

Runs `node dist/index.js` — only works after `pnpm build`.

## Run tests

There are **no test scripts yet** in this project. Good first contribution?

## Quick smoke test (using curl)

Open a new terminal and try these:

```bash
# Sign up a user
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"user_handle":"alice","email_address":"alice@test.com","first_name":"Alice","last_name":"Smith"}'

# Sign in (get a session token)
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email_address":"alice@test.com"}'

# Create a tweet (replace TOKEN with your session token)
curl -X POST http://localhost:3000/api/tweets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"tweet_text":"Hello from Buddy!"}'
```

## Common problems

| Problem | Likely fix |
|---------|-----------|
| `ECONNREFUSED` on MySQL | Make sure MySQL is running. Check `DB_HOST`, `DB_PORT` in `.env`. |
| `Unknown database 'twitter_db'` | Run `CREATE DATABASE twitter_db;` in MySQL. |
| `ERR_MODULE_NOT_FOUND` for `.js` imports | This is an ESM project. All local imports use `.js` extensions. That's correct — `tsx` and `tsc` handle the `.ts` → `.js` mapping. |
| `SyntaxError` on startup | Make sure you have Node 18+ (uses `crypto.randomUUID()`). |

## Where things live

- **Config:** `.env` (gitignored) + `src/config/index.ts`
- **Source code:** All TypeScript in `src/`
- **Built output:** `dist/` (gitignored)
- **Database:** MySQL — no migration files, schema is assumed to exist
