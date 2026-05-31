# Twitter Clone API

A Twitter-like REST API built with Express, TypeScript, and MySQL.

## Prerequisites

- Node.js
- pnpm
- MySQL running with a socket at `/tmp/mysql_3306.sock`

## Setup

```bash
pnpm install
cp .env.example .env
```

Create the database and tables:

```bash
mysql -u root < src/config/sql_schema.sql
```

Optionally load mock data:

```bash
mysql -u root < src/config/sql_mock_data.sql
```

## Development

```bash
pnpm dev
```

Starts the dev server with hot reload on `http://localhost:3000`.

## Build & Start

```bash
pnpm build
pnpm start
```

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
