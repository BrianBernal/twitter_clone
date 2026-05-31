# Twitter Clone

A full-stack Twitter-like social media app with an Express + MySQL API backend and a React frontend.

## Prerequisites

- Node.js
- pnpm
- MySQL running with a socket at `/tmp/mysql_3306.sock`

## Setup

```bash
pnpm install
cp api/.env.example api/.env
```

Create the database and tables:

```bash
mysql -u root < api/src/config/sql_schema.sql
```

Optionally load mock data:

```bash
mysql -u root < api/src/config/sql_mock_data.sql
```

## Development

Start both the API and App dev servers:

```bash
pnpm dev
```

Or run them individually:

| Command | What it starts | URL |
|---------|---------------|-----|
| `pnpm dev:api` | Express API with hot reload | `http://localhost:4000` |
| `pnpm dev:app` | Vite React app with HMR | `http://localhost:5173` |

The Vite dev server proxies `/api/**` requests to the Express API.

## Build & Start

```bash
pnpm build
pnpm start
```

Builds both workspaces. `pnpm start` runs the compiled API server.

## Project Structure

| Directory | Purpose |
|-----------|---------|
| `api/` | Express + MySQL2 backend (ESM, TypeScript) |
| `app/` | React + Vite + TanStack frontend |

## API

All endpoints return `{ data: ... }` on success and `{ error: "..." }` on failure. Most routes require authentication via `Authorization: Bearer <token>`.

### Auth

| Method | Path             | Description            |
|--------|------------------|------------------------|
| POST   | /api/auth/signup | Create an account      |
| POST   | /api/auth/signin | Sign in (email only)   |
| POST   | /api/auth/signout | Destroy session       |

### Users

| Method | Path                     | Description         |
|--------|--------------------------|---------------------|
| GET    | /api/users/:id           | Get user profile    |
| GET    | /api/users/:id/followers | Get followers list  |
| GET    | /api/users/:id/following | Get following list  |
| GET    | /api/getAllUsers         | List all users      |

### Tweets

| Method | Path                   | Description        |
|--------|------------------------|--------------------|
| POST   | /api/tweets            | Create a tweet     |
| DELETE | /api/tweets/:id        | Delete own tweet   |
| POST   | /api/tweets/:id/like   | Like a tweet       |
| DELETE | /api/tweets/:id/like   | Unlike a tweet     |
| GET    | /api/tweets/:id/likes  | Get tweet likes    |

### Follows

| Method | Path                         | Description         |
|--------|------------------------------|---------------------|
| POST   | /api/followers               | Follow a user       |
| DELETE | /api/followers/:following_id | Unfollow a user     |

### Feed

| Method | Path      | Description               |
|--------|-----------|---------------------------|
| GET    | /api/feed | Paginated timeline feed   |

Supports `?limit=N&offset=O` for pagination (limit 1–100, default 20).
