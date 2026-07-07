# Chirp — Frontend Refactor Specification

> Spec-Driven Development (SDD) document for rebuilding the Twitter clone frontend as **Chirp**.
> Design source: Stitch "Minimalist Twitter Clone" project ("Midnight Velocity" design system).
> Backend: `./api` (Express + MySQL2, ESM) — untouched.

---

## Scope

- **Delete**: current business logic in `app/src/` (components, hooks, routes, CSS modules, `App.tsx`, `index.css`)
- **Keep**: `app/src/api/client.ts`, `app/src/api/types.ts`, config files (vite, eslint, tsconfig, package.json, index.html, public/)
- **Build**: React 19 + TypeScript + Vite 8 + TanStack Query 5 + TanStack Router 1 + Tailwind CSS v4
- **Style**: Dark "Midnight Velocity" design system from Stitch — no CSS modules, all styling via Tailwind utilities

---

## Stack

| Layer            | Technology                       |
| ---------------- | -------------------------------- |
| Framework        | React 19                         |
| Language         | TypeScript ~6.0                  |
| Build            | Vite 8                           |
| Routing          | TanStack Router 1 (file-based)   |
| Data fetching    | TanStack Query 5                 |
| Styling          | Tailwind CSS v4                  |
| Dev server proxy | `/api` → `http://localhost:4000` |

---

## Design Tokens ("Midnight Velocity")

Derived from Stitch design system. Source of truth: `app/src/index.css`.

| Token                    | Value                         | Usage                                    |
| ------------------------ | ----------------------------- | ---------------------------------------- |
| `--color-surface`        | `#0f1419`                     | Page background                          |
| `--color-surface-2`      | `#1d2a3a`                     | Card/sidebar background                  |
| `--color-surface-3`      | `#273340`                     | Hover/active state                       |
| `--color-text-primary`   | `#dee3ea`                     | Body text                                |
| `--color-text-secondary` | `#8b98a5`                     | Secondary text (handles, timestamps)     |
| `--color-primary`        | `#1d9bf0`                     | Buttons, links, accents                  |
| `--color-primary-hover`  | `#1a8cd8`                     | Hover state for primary                  |
| `--color-secondary`      | `#f91880`                     | Likes, danger actions                    |
| `--color-accent`         | `#ffb875`                     | Tertiary accents                         |
| `--color-border`         | `#2f3336`                     | Dividers, borders                        |
| `--color-success`        | `#00ba7c`                     | Success states                           |
| `--font-sans`            | `'Inter', sans-serif`         | Body & heading text                      |
| `--font-mono`            | `'JetBrains Mono', monospace` | Labels, metadata                         |
| Roundness                | `8px`                         | Border radius for cards, inputs, buttons |

---

## Routes

| Path         | File                     | Auth     | Description                                               |
| ------------ | ------------------------ | -------- | --------------------------------------------------------- |
| `/`          | `routes/index.tsx`       | Required | Home feed — scrollable tweet list, "Chirp" compose button |
| `/signin`    | `routes/signin.tsx`      | Optional | Email-only sign in with 5 seed account hints              |
| `/signup`    | `routes/signup.tsx`      | Optional | Create account (handle, email, first_name, last_name)     |
| `/following` | `routes/following.tsx`   | Required | Users the auth user follows                               |
| `/followers` | `routes/followers.tsx`   | Required | Auth user's followers                                     |
| `/users`     | `routes/users.index.tsx` | Required | All users directory                                       |
| `/users/$id` | `routes/users.$id.tsx`   | Required | User profile with stats                                   |

---

## Component Tree

```
RootLayout (3-column grid)
├── LeftSidebar (fixed, 275px)
│   ├── Chirp logo/wordmark
│   ├── NavItem: Home (/)
│   ├── NavItem: Explore (/users)
│   ├── NavItem: Following (/following)
│   ├── NavItem: Followers (/followers)
│   ├── NavItem: Profile (/users/$id) — auth user only
│   └── NavItem: Sign Out — auth only
│
├── Main (scrollable, max-w 600px)
│   └── <Outlet /> → page content
│
├── RightSidebar (fixed, 350px, auth only)
│   ├── ProfileCard
│   │   ├── Avatar
│   │   ├── Name + @handle
│   │   └── Stats row (Followers / Following — both link to pages)
│   └── WhoToFollow
│       └── UserCard[] (with Follow/Unfollow button)
│
├── MobileNav (bottom bar, <768px only)
│   └── NavItem x 5 (Home, Explore, Following, Followers, Profile)
│
└── MobileDrawer (slide-out, <768px only)
    └── Same nav as LeftSidebar

Page-level components:
├── SignInPage
│   └── Email input + Sign In button + SeedAccount pills x5 + Sign Up link
├── SignUpPage
│   └── Handle/Email/First/Last inputs + Sign Up button + Sign In link
├── FeedPage
│   ├── FeedHeader ("Home" title)
│   ├── TweetCard[] (paginated)
│   │   ├── Avatar placeholder
│   │   ├── @handle + relative timestamp
│   │   ├── Tweet text
│   │   ├── Like button (heart icon + count)
│   │   └── Delete button (visible on hover, own tweets only)
│   └── ComposeFAB → opens ComposeModal
├── ComposeModal
│   ├── Textarea (max 280 chars)
│   ├── Char counter (turns red <20 chars remaining)
│   └── "Chirp" submit button
├── FollowersPage
│   └── UserCard[] (with Follow/Unfollow)
├── FollowingPage
│   └── UserCard[] (with Follow/Unfollow)
├── UsersPage
│   └── UserCard[] (links to /users/$id)
└── UserProfilePage
    ├── Cover/banner area
    ├── Avatar + Name + @handle
    └── Stats: Tweets / Following / Followers
```

---

## Data Layer

### API Client (`app/src/api/client.ts`) — UNCHANGED

All API functions remain as-is. Key signatures:

| Function                 | Calls                          | Returns                     |
| ------------------------ | ------------------------------ | --------------------------- |
| `signup(h, e, f, l)`     | `POST /api/auth/signup`        | `ApiResponse<AuthResponse>` |
| `signin(e)`              | `POST /api/auth/signin`        | `ApiResponse<AuthResponse>` |
| `signout()`              | `POST /api/auth/signout`       | `ApiResponse<{message}>`    |
| `getUser(id)`            | `GET /api/users/:id`           | `ApiResponse<User>`         |
| `getUserFollowers(id)`   | `GET /api/users/:id/followers` | `ApiResponse<User[]>`       |
| `getUserFollowing(id)`   | `GET /api/users/:id/following` | `ApiResponse<User[]>`       |
| `getAllUsers()`          | `GET /api/getAllUsers`         | `ApiResponse<User[]>`       |
| `createTweet(text)`      | `POST /api/tweets`             | `ApiResponse<Tweet>`        |
| `deleteTweet(id)`        | `DELETE /api/tweets/:id`       | `ApiResponse<{message}>`    |
| `likeTweet(id)`          | `POST /api/tweets/:id/like`    | `ApiResponse<{message}>`    |
| `unlikeTweet(id)`        | `DELETE /api/tweets/:id/like`  | `ApiResponse<{message}>`    |
| `getFeed(limit, offset)` | `GET /api/feed`                | `ApiResponse<Tweet[]>`      |
| `followUser(id)`         | `POST /api/followers`          | `ApiResponse<{message}>`    |
| `unfollowUser(id)`       | `DELETE /api/followers/:id`    | `ApiResponse<{message}>`    |

### Types (`app/src/api/types.ts`) — UNCHANGED

```typescript
User       { user_id, user_handle, email_address, first_name, last_name,
             phone_number|null, follower_count, following_count?, tweet_count?,
             created_at }
Tweet      { tweet_id, user_id, tweet_text, likes_count, created_at, user_handle? }
AuthResponse  { session_token, user: User }
ApiResponse<T> { data: T }
```

### Custom Hooks (new implementations, same API calls)

| Hook                   | Query/Mutation     | Key                         |
| ---------------------- | ------------------ | --------------------------- |
| `useSignup`            | `useMutation`      | —                           |
| `useSignin`            | `useMutation`      | —                           |
| `useSignout`           | `useMutation`      | —                           |
| `useFeed`              | `useInfiniteQuery` | `['feed']`                  |
| `useCreateTweet`       | `useMutation`      | invalidates `['feed']`      |
| `useDeleteTweet`       | `useMutation`      | invalidates `['feed']`      |
| `useLikeTweet`         | `useMutation`      | invalidates `['feed']`      |
| `useUnlikeTweet`       | `useMutation`      | invalidates `['feed']`      |
| `useUser(id)`          | `useQuery`         | `['user', id]`              |
| `useUserFollowers(id)` | `useQuery`         | `['user', id, 'followers']` |
| `useUserFollowing(id)` | `useQuery`         | `['user', id, 'following']` |
| `useAllUsers`          | `useQuery`         | `['users']`                 |
| `useFollowUser`        | `useMutation`      | invalidates `['user']`      |
| `useUnfollowUser`      | `useMutation`      | invalidates `['user']`      |

Auth hooks also call `setToken`/`clearToken` and `navigate` to redirect.

---

## Layout Specifications

### Desktop (≥768px)

```
┌─────────────────────────────────────────────────────────────┐
│ ┌──────────┐ ┌──────────────────────┐ ┌──────────────────┐ │
│ │ Sidebar  │ │     Main Feed        │ │  Right Sidebar   │ │
│ │ 275px    │ │     ~600px           │ │   ~350px         │ │
│ │          │ │                      │ │                  │ │
│ │ 🐦 Chirp │ │ TweetCard            │ │ Your Profile     │ │
│ │ ──────── │ │ TweetCard            │ │ @handle          │ │
│ │ 🏠 Home  │ │ TweetCard            │ │ Followers Follow │ │
│ │ 🔍 Expl. │ │ ...                  │ │ ─────────────── │ │
│ │ 👥 Folow │ │                      │ │ Who to follow    │ │
│ │ 👤 Prof. │ │                      │ │ UserCard         │ │
│ │ 🚪 Sign  │ │                      │ │ UserCard         │ │
│ │   Out    │ │                      │ │                  │ │
│ └──────────┘ └──────────────────────┘ └──────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Mobile (<768px)

```
┌──────────────────────────────┐
│  ← 🐦 Chirp          ☰ Menu │  ← Top bar
├──────────────────────────────┤
│                              │
│  TweetCard                   │  ← Full-width feed
│  TweetCard                   │
│  TweetCard                   │
│  ...                         │
│                              │
├──────────┬──────────┬───────┤
│   🏠     │   🔍     │  👤   │  ← Bottom nav
│  Home    │ Explore  │Profile│
└──────────┴──────────┴───────┘

Drawer (slide from left):
┌──────────────────────────────┐
│ 🐦 Chirp                     │
│ 🏠 Home                      │
│ 🔍 Explore / Users           │
│ 👥 Following                 │
│ 👥 Followers                 │
│ 👤 Profile                   │
│ 🚪 Sign Out                  │
└──────────────────────────────┘
```

---

## Auth Flow

```
                    ┌─────────────┐
                    │   /signup   │
                    │ Create acct │
                    └──────┬──────┘
                           │ on success
                           ▼
┌──────────┐         ┌─────────────┐         ┌──────────┐
│ /signin  │ ───────→│  setToken() │ ───────→│    /     │
│ email    │  POST   │  navigate() │  redirect│  Feed   │
│ + seeds  │  /auth  └─────────────┘         │          │
└──────────┘         ┌─────────────┐         │ Tweet[] │
       ▲             │  /signout   │         └────┬─────┘
       │             │ clearToken  │              │
       │             │ navigate()  │              │
       │             └─────────────┘              │
       └──────────────────────────────────────────┘
       (if no token, / redirects to /signin)
```

- Token stored in `localStorage` as `twitter_clone_token`
- Auth state derived from `!!getToken()` on each page
- `auth-change` event dispatches on login/logout (used by layout to re-render)
- No password — email-only sign in (POC requirement)

---

## Seed Accounts (for Sign In quick-fill)

From `api/src/config/sql_mock_data.sql`:

| Handle    | Email                 | Name          |
| --------- | --------------------- | ------------- |
| `alice`   | `alice@example.com`   | Alice Johnson |
| `bob`     | `bob@example.com`     | Bob Smith     |
| `charlie` | `charlie@example.com` | Charlie Brown |
| `diana`   | `diana@example.com`   | Diana Prince  |
| `eve`     | `eve@example.com`     | Eve Davis     |

Shown as pill buttons on the Sign In page. Clicking one fills the email input.

---

## Implementation Order

### Phase 0: Setup

1. Install `tailwindcss` + `@tailwindcss/vite`
2. Add `@tailwindcss/vite` to `vite.config.ts`
3. Replace `src/index.css` with Tailwind v4 entry + design tokens
4. Delete: `src/App.tsx`, `src/components/`, `src/hooks/`, `src/routes/`, CSS modules, old `index.css`
5. Update `index.html` title to "Chirp" + update favicon
6. Verify `pnpm dev` builds cleanly

### Phase 1: Auth (Sign In / Sign Up)

1. Create `hooks/useAuth.ts` — signin/signup/signout mutations
2. Create `routes/signin.tsx` — email input, seed pills, form submit
3. Create `routes/signup.tsx` — 4-field form
4. Create `routes/__root.tsx` — minimal wrapper with `<Outlet />`
5. Verify sign in → redirect to `/`, sign out works

### Phase 2: Layout & Navigation

1. Create `components/layout/RootLayout.tsx` — 3-column grid
2. Create `components/layout/LeftSidebar.tsx` — nav items
3. Create `components/layout/RightSidebar.tsx` — profile card + who to follow
4. Create `components/layout/MobileNav.tsx` — bottom nav bar
5. Create `components/layout/MobileDrawer.tsx` — slide-out drawer
6. Wire up auth-aware nav (show/hide items based on token)

### Phase 3: Feed

1. Create `hooks/useFeed.ts` — infinite query
2. Create `hooks/useTweets.ts` — create/delete/like mutations
3. Create `components/tweets/TweetCard.tsx`
4. Create `components/tweets/ComposeModal.tsx`
5. Create `routes/index.tsx` — feed page + compose FAB
6. Verify: tweet list, like/unlike, delete, compose

### Phase 4: Users & Follows

1. Create `hooks/useUsers.ts` — user queries + follow mutations
2. Create `components/users/UserCard.tsx`
3. Create `routes/followers.tsx`
4. Create `routes/following.tsx`
5. Create `routes/users.index.tsx`
6. Create `routes/users.$id.tsx`
7. Wire up "Who to follow" in RightSidebar with follow/unfollow

### Phase 5: Verification

1. Run `pnpm lint` — must pass clean
2. Run `pnpm build` — must succeed (`vite build && tsc -b`)
3. Manual QA against checklist below

---

## QA Checklist

- [ ] Sign In page renders — 5 seed account pills visible, clickable
- [ ] Sign In with each seed account succeeds, redirects to `/`
- [ ] Sign Up with new account succeeds, redirects to `/`
- [ ] Sign Out clears session, redirects to `/signin`
- [ ] Unauthenticated access to `/` redirects to `/signin`
- [ ] Home feed loads tweets with pagination
- [ ] Compose modal opens, char counter works, 280 limit enforced
- [ ] New tweet appears in feed after compose
- [ ] Like button toggles heart + count updates
- [ ] Delete button appears on hover for own tweets only
- [ ] Following page shows auth user's following list
- [ ] Followers page shows auth user's followers list
- [ ] Right sidebar shows auth user's profile + stats
- [ ] "Who to follow" shows users not yet followed
- [ ] Follow/unfollow in sidebar updates in real time
- [ ] User profile page shows user info + stats
- [ ] Clicking Following/Follower counts navigates to respective pages
- [ ] Mobile layout shows bottom nav + drawer
- [ ] `pnpm lint` passes
- [ ] `pnpm build` succeeds

---

## Files to Keep vs Delete vs Create

### Kept (unchanged)

```
app/package.json                 ← plus add tailwindcss dep
app/vite.config.ts               ← plus add @tailwindcss/vite plugin
app/tsconfig.json
app/tsconfig.app.json
app/tsconfig.node.json
app/eslint.config.js
app/index.html                   ← update <title>
app/public/                      ← update favicon
app/src/api/client.ts
app/src/api/types.ts
app/src/main.tsx                 ← structure kept, minor updates ok
```

### Deleted

```
app/src/App.tsx
app/src/index.css
app/src/components/Layout.tsx + Layout.module.css
app/src/components/Feed.tsx + Feed.module.css
app/src/components/TweetCard.tsx + TweetCard.module.css
app/src/hooks/useAuth.ts
app/src/hooks/useFeed.ts
app/src/hooks/useTweets.ts
app/src/hooks/useUsers.ts
app/src/routes/__root.tsx
app/src/routes/index.tsx
app/src/routes/signin.tsx
app/src/routes/signup.tsx
app/src/routes/users.index.tsx
app/src/routes/users.$id.tsx
app/src/routeTree.gen.ts         (auto-regen by router plugin)
```

### Created (new or rewritten)

```
app/src/index.css                          ← Tailwind v4 + design tokens
app/src/main.tsx                           ← kept, minor updates
app/src/hooks/useAuth.ts                   ← rewrite
app/src/hooks/useFeed.ts                   ← rewrite
app/src/hooks/useTweets.ts                 ← rewrite
app/src/hooks/useUsers.ts                  ← rewrite
app/src/routes/__root.tsx                  ← rewrite
app/src/routes/index.tsx                   ← rewrite (feed page)
app/src/routes/signin.tsx                  ← rewrite
app/src/routes/signup.tsx                  ← rewrite
app/src/routes/followers.tsx               ← NEW
app/src/routes/following.tsx               ← NEW
app/src/routes/users.index.tsx             ← rewrite
app/src/routes/users.$id.tsx               ← rewrite
app/src/components/layout/RootLayout.tsx   ← NEW
app/src/components/layout/LeftSidebar.tsx  ← NEW
app/src/components/layout/RightSidebar.tsx ← NEW
app/src/components/layout/MobileNav.tsx    ← NEW
app/src/components/layout/MobileDrawer.tsx ← NEW
app/src/components/tweets/TweetCard.tsx    ← NEW
app/src/components/tweets/ComposeModal.tsx ← NEW
app/src/components/users/UserCard.tsx      ← NEW
```
