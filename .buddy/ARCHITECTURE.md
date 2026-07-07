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

### Frontend (App) — React + TanStack + Tailwind

| Layer      | Directory                    | Responsibility                                                 |
| ---------- | ---------------------------- | -------------------------------------------------------------- |
| Routes     | `app/src/routes/`            | Page-level components, one per URL path (file-based)           |
| Layout     | `app/src/components/layout/` | RootLayout, LeftSidebar, RightSidebar, MobileNav, MobileDrawer |
| Tweets     | `app/src/components/tweets/` | TweetCard, ComposeModal                                        |
| Users      | `app/src/components/users/`  | UserCard                                                       |
| UI         | `app/src/components/ui/`     | ToastProvider + useToast (context-based notification system)   |
| Hooks      | `app/src/hooks/`             | TanStack Query wrappers — data fetching + mutations            |
| API client | `app/src/api/`               | HTTP client with auth header injection + TypeScript types      |

## Component tree

```
main.tsx
  └── QueryClientProvider
       └── ToastProvider
            └── RouterProvider
                 └── RootLayout (3-column grid)
                      ├── LeftSidebar (desktop, 275px)
                      │   ├── Chirp logo
                      │   ├── Nav: Home, Explore, Following, Followers, Profile
                      │   └── Sign Out button
                      │
                      ├── Main (scrollable, max-w 600px)
                      │   └── <Outlet /> → page content
                      │       ├── FeedPage (/)
                      │       ├── SignInPage (/signin)
                      │       ├── SignUpPage (/signup)
                      │       ├── FollowersPage (/followers)
                      │       ├── FollowingPage (/following)
                      │       ├── UsersPage (/users)
                      │       └── UserProfilePage (/users/$id)
                      │
                      ├── RightSidebar (desktop, 350px, auth only)
                      │   ├── ProfileCard
                      │   └── WhoToFollow
                      │
                      ├── MobileNav (bottom bar, <768px)
                      └── MobileDrawer (slide-out, <768px)
```

## Request / data flow

### Full-stack flow: Creating a tweet

```
1. User taps "Chirp" FAB button in FeedPage
        │
2.      ▼
   [ComposeModal] — textarea, char counter, submit button
        │
3.      ▼
   [useCreateTweet] — TanStack Query mutation
        │
4.      ▼
   [api/client.ts] — POST /api/tweets with Bearer token
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
   TanStack Query invalidates ['feed'] cache → UI re-renders
```

### Error flow (with Toast)

```
1. API returns 400/500 response
        │
2.      ▼
   [api/client.ts] — throws Error with body.error message
        │
3.      ▼
   [useMutation.onError] — calls toast.show(error.message)
        │
4.      ▼
   [ToastProvider] — renders ToastItem with error message
        │
5.      ▼
   [ToastItem] — auto-dismisses after 5s, hover pauses timer
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
- **Auth token is stored in `localStorage`** as `twitter_clone_token`, sent as `Authorization: Bearer` header.
- **User info is stored** in `localStorage` as `twitter_clone_user`.
- **Auth changes dispatch a custom `auth-change` event** on window — the layout listens to re-render.
- **Errors flow upward through ToastProvider.** Hooks call `toast.show()` on mutation errors.
- **Styling is 100% Tailwind CSS v4.** No CSS modules. Design tokens in `app/src/index.css`.
