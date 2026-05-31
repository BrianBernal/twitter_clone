# Welcome to twitter-clone! 👋

Hi there! I'm **Buddy**, your friendly guide to this repo.

---

## What is this project?

**twitter-clone** is a full-stack Twitter-like social media app. It has two parts:

| Part             | What it does                                             | Tech                                               |
| ---------------- | -------------------------------------------------------- | -------------------------------------------------- |
| **API** (`api/`) | Backend REST API — handles users, tweets, follows, likes | Express + TypeScript + MySQL                       |
| **App** (`app/`) | Frontend web app — the UI you see in the browser         | React 19 + Vite + TanStack Router + TanStack Query |

Together they let you:

- **Sign up / sign in** with an email (no password!)
- **Create tweets** (up to 280 characters)
- **Follow / unfollow** other users
- **Like / unlike** tweets
- **View a feed** of tweets from people you follow
- **Browse a user directory** and visit profile pages

## Big-picture concepts

1. **No passwords.** Auth works with session tokens. You sign up with an email, the server gives you a token, and you put that token in the `Authorization: Bearer <token>` header on every request.
2. **In-memory sessions.** Tokens are stored in a `Map` in the server's memory. If the server restarts, everyone is logged out.
3. **MySQL database.** All users, tweets, follows, and likes live in a MySQL database. No ORM — raw SQL queries with `mysql2`.
4. **JSON API.** Every endpoint returns `{ "data": ... }` on success and `{ "error": "..." }` on failure.
5. **Monorepo.** The API and app live in the same repo using pnpm workspaces. Run both dev servers with one command.
6. **No tests yet.** There are no test files in the repo. That's a great place to contribute!

## Quick links

- 🚀 **Just want to run it?** → [`GETTING_STARTED.md`](./GETTING_STARTED.md)
- 🗺️ **Where does code live?** → [`MAP/repo_map.md`](./MAP/repo_map.md)
- 🏛️ **How is it built?** → [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- 🧰 **What tech does it use?** → [`TECH_STACK.md`](./TECH_STACK.md)
- 🔌 **What does it talk to?** → [`INTEGRATIONS.md`](./INTEGRATIONS.md)
- 📎 **Important external docs** → [`LINKS.md`](./LINKS.md)
- ❓ **Things Buddy isn't sure about** → [`NOTES/open_questions.md`](./NOTES/open_questions.md)

---

## How to use Buddy

In your terminal:

- `@buddy status` — Is the knowledge here up to date?
- `@buddy open <name>` — Open a Buddy doc (try: `@buddy open getting-started`).

Ask questions like:

- _"How do I run this project?"_
- _"Where does login happen?"_
- _"Update buddy"_ (before committing)
