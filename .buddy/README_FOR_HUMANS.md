# Welcome to twitter-clone (aka **Chirp**) 👋

Hi there! I'm **Buddy**, your friendly guide to this repo.

---

## What is this project?

**Chirp** is a Twitter-like social media app. It has two parts:

| Part             | What it does                                             | Tech                                                      |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------------- |
| **API** (`api/`) | Backend REST API — handles users, tweets, follows, likes | Express + TypeScript + MySQL                              |
| **App** (`app/`) | Frontend web app — the UI you see in the browser         | React 19 + Vite + TanStack Router/Query + Tailwind CSS v4 |

Together they let you:

- **Sign up / sign in** with an email (no password!)
- **Create "chirps"** (tweets up to 280 characters)
- **Follow / unfollow** other users
- **Like / unlike** chirps
- **View a feed** of chirps from people you follow
- **Browse a user directory** ("Explore"), visit profiles
- **See followers & following** lists
- …all in a dark-themed **Midnight Velocity** design system

## Big-picture concepts

1. **No passwords.** Auth works with session tokens. You sign up with an email, the server gives you a token, and you put that token in the `Authorization: Bearer <token>` header on every request.
2. **In-memory sessions.** Tokens are stored in a `Map` in the server's memory. If the server restarts, everyone is logged out.
3. **MySQL database.** All users, chirps, follows, and likes live in a MySQL database. No ORM — raw SQL queries with `mysql2`.
4. **JSON API.** Every endpoint returns `{ "data": ... }` on success and `{ "error": "..." }` on failure.
5. **Monorepo.** The API and app live in the same repo using pnpm workspaces. Run both dev servers with one command.
6. **Styling uses Tailwind CSS v4.** All design tokens (colors, fonts, spacing) are defined in `app/src/index.css` as a "Midnight Velocity" dark theme.
7. **E2E tests with Playwright.** Tests run in Chromium, Firefox, and WebKit. Config auto-starts both dev servers.

## Quick links

- 🚀 **Just want to run it?** → [`GETTING_STARTED.md`](./GETTING_STARTED.md)
- 🗺️ **Where does code live?** → [`MAP/repo_map.md`](./MAP/repo_map.md)
- 🏛️ **How is it built?** → [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- 🧰 **What tech does it use?** → [`TECH_STACK.md`](./TECH_STACK.md)
- 🔌 **What does it talk to?** → [`INTEGRATIONS.md`](./INTEGRATIONS.md)
- 📎 **Important external docs** → [`LINKS.md`](./LINKS.md)
- ❓ **Things Buddy isn't sure about** → [`NOTES/open_questions.md`](./NOTES/open_questions.md)
- 📋 **First things to try** → [`STARTER_TASKS.md`](./STARTER_TASKS.md)

---

## How to use Buddy

In your terminal:

- `@buddy status` — Is the knowledge here up to date?
- `@buddy open <name>` — Open a Buddy doc (try: `@buddy open getting-started`).

Ask questions like:

- _"How do I run this project?"_
- _"Where does login happen?"_
- _"Update buddy"_ (before committing)
