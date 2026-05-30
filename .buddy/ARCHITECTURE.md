🏠 [Home](./README_FOR_HUMANS.md) · [Getting Started](./GETTING_STARTED.md) · [Architecture](./ARCHITECTURE.md) · [Tech](./TECH_STACK.md) · [Integrations](./INTEGRATIONS.md) · [Repo Map](./MAP/repo_map.md) · [Links](./LINKS.md)

---

# Architecture

> ✅ All content **Verified** from code.

## Big picture

This is a simple **layered Express API**. A request comes in → goes through middleware → hits a controller → calls a model that runs SQL → returns JSON.

There are 4 layers:

1. **Routes** — map URLs to controllers
2. **Middleware** — check auth, validate input, catch errors
3. **Controllers** — handle the request, call models, send the response
4. **Models** — run SQL queries against MySQL

## Major components

| Layer | Directory | Responsibility |
|---|---|---|
| Routes | `src/routes/` | Define URL paths and chain middleware + controllers |
| Middleware | `src/middleware/` | Auth checks, input validation, error handling |
| Controllers | `src/controllers/` | Business logic — decide what to do with a request |
| Models | `src/models/` | Database queries — talk to MySQL |
| Validators | `src/validators/` | Per-route validation functions |
| Config | `src/config/` | Environment config, DB pool, validation flags |
| Types | `src/types/` | TypeScript interfaces for User, Tweet, etc. |

## Request / data flow

### Example: Creating a tweet

```
1. POST /api/tweets
       │
2.      ▼
   [authMiddleware]   — reads Authorization header, sets req.userId
       │
3.      ▼
   [validationMiddleware] — checks tweet_text is present & ≤ 280 chars
       │
4.      ▼
   [tweetRoutes.createTweet controller]
       │
5.      ▼
   [tweetModel.createTweet()]   — INSERT INTO tweets SQL
       │
6.      ▼
   Response: { data: { tweet_id: 1, ... } }  (status 201)
```

### Example: Getting the feed

```
1. GET /api/feed?limit=20&offset=0
       │
2.      ▼
   [authMiddleware]   — reads Authorization header
       │
3.      ▼
   [tweetController.feed] — parses limit/offset query params
       │
4.      ▼
   [tweetModel.getFeedForUser()] — SELECT with JOIN on followers
       │
5.      ▼
   Response: { data: [tweet, tweet, ...] }  (status 200)
```

## Key boundaries

- **Routes never do logic.** They just wire up middleware + controllers.
- **Controllers never touch the database directly.** They call model functions.
- **Models never send HTTP responses.** They return data (or throw errors).
- **Middleware never calls models** (with one exception: auth middleware creates/destroys sessions).
- **Validators are registered separately** from routes, in a global `Map`.
- **Auth is completely in-memory.** No database involved for sessions. Restart = everyone's logged out.
- **All endpoints return `{ data: ... }` or `{ error: "..." }`.** The `errorHandler` middleware catches unhandled errors as 500.
