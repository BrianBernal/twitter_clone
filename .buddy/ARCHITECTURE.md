🏠 [Home](./README_FOR_HUMANS.md) · [Getting Started](./GETTING_STARTED.md) · [Architecture](./ARCHITECTURE.md) · [Tech](./TECH_STACK.md) · [Integrations](./INTEGRATIONS.md) · [Repo Map](./MAP/repo_map.md) · [Links](./LINKS.md)

---

# Architecture

> ✅ All content **Verified** from code.

## Big picture

This is a **full-stack monorepo** with two independent workspaces that communicate over HTTP.

```
┌─────────────┐   HTTP (port 5173 → proxy to :4000)   ┌─────────────┐
│   App       │ ──────────────────────────────────────→ │   API       │
│  (React)    │ ←────────────────────────────────────── │  (Express)  │
│             │          JSON responses                  │             │
│  Vite dev   │                                         │  MySQL2     │
│  server     │                                         │  (pool)     │
└─────────────┘                                         └──────┬──────┘
                                                               │
                                                         ┌─────▼──────┐
                                                         │   MySQL    │
                                                         │  Database  │
                                                         └────────────┘
```

### Backend (API) — layered Express architecture

There are 4 layers:

1. **Routes** — map URLs to controllers
2. **Middleware** — check auth, validate input, catch errors
3. **Controllers** — handle the request, call models, send the response
4. **Models** — run SQL queries against MySQL

| Layer       | Directory              | Responsibility                                      |
| ----------- | ---------------------- | --------------------------------------------------- |
| Routes      | `api/src/routes/`      | Define URL paths and chain middleware + controllers |
| Middleware  | `api/src/middleware/`  | Auth checks, input validation, error handling       |
| Controllers | `api/src/controllers/` | Business logic — decide what to do with a request   |
| Models      | `api/src/models/`      | Database queries — talk to MySQL                    |
| Validators  | `api/src/validators/`  | Per-route validation functions                      |
| Config      | `api/src/config/`      | Environment config, DB pool, validation flags       |
| Types       | `api/src/types/`       | TypeScript interfaces for User, Tweet, etc.         |

### Frontend (App) — React + TanStack

| Layer      | Directory             | Responsibility                                      |
| ---------- | --------------------- | --------------------------------------------------- |
| Routes     | `app/src/routes/`     | Page-level components, one per URL path             |
| Components | `app/src/components/` | Reusable UI pieces (Feed, TweetCard, Layout)        |
| Hooks      | `app/src/hooks/`      | TanStack Query wrappers — data fetching + mutations |
| API client | `app/src/api/`        | HTTP client with auth header injection              |

## Request / data flow

### Full-stack flow: Creating a tweet

```
1. User fills out tweet form in the browser
        │
2.      ▼
   [app/src/components/Feed.tsx] — calls useTweets().createTweet()
        │
3.      ▼
   [app/src/hooks/useTweets.ts] — TanStack Query mutation
        │
4.      ▼
   [app/src/api/client.ts] — POST /api/tweets with Bearer token
        │
5.      ▼  (Vite proxies /api/* to localhost:4000)
        │
6.      ▼
   [authMiddleware] — reads Authorization header, sets req.userId
        │
7.      ▼
   [validationMiddleware] — checks tweet_text is present & ≤ 280 chars
        │
8.      ▼
   [tweetController.create] — calls tweetModel
        │
9.      ▼
   [tweetModel.createTweet()] — INSERT INTO tweets SQL
        │
10.     ▼
   Response: { data: { tweet_id, ... } } (status 201)
        │
11.     ▼
   TanStack Query invalidates feed cache → UI re-renders
```

### API-only flow: Getting the feed

```
1. GET /api/feed?limit=20&offset=0
        │
2.      ▼
   [authMiddleware] — reads Authorization header
        │
3.      ▼
   [feed controller] — parses limit/offset query params
        │
4.      ▼
   [tweetModel.getFeedForUser()] — SELECT with JOIN on followers
        │
5.      ▼
   Response: { data: [tweet, ...] } (status 200)
```

## Key boundaries

### Backend

- **Routes never do logic.** They just wire up middleware + controllers.
- **Controllers never touch the database directly.** They call model functions.
- **Models never send HTTP responses.** They return data (or throw errors).
- **Middleware never calls models** (except auth middleware creates/destroys sessions).
- **Auth is completely in-memory.** No database involved for sessions. Restart = everyone's logged out.
- **All endpoints return `{ data: ... }` or `{ error: "..." }`.** The `errorHandler` middleware catches unhandled errors as 500.

### Frontend

- **Pages never fetch data directly.** They use hooks that wrap TanStack Query.
- **Hooks never touch the DOM.** They return data + mutation functions.
- **API client never knows about React.** It's a plain fetch wrapper.
- **Auth token is stored in `localStorage`**, sent as `Authorization: Bearer` header.
