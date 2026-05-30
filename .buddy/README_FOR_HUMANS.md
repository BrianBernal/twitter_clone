# Welcome to twitter-clone-api! 👋

Hi there! I'm **Buddy**, your friendly guide to this repo.

---

## What is this project?

**twitter-clone-api** is a simple Twitter-like REST API. It lets you:

- **Sign up / sign in** with an email address (no password!)
- **Create tweets** (up to 280 characters)
- **Follow / unfollow** other users
- **Like / unlike** tweets
- **View a feed** of tweets from people you follow

No frontend — just a JSON API you can call with any HTTP client (curl, Postman, your own app).

## Big-picture concepts

1. **No passwords.** Auth works with session tokens. You sign up with an email, the server gives you a token, and you put that token in the `Authorization: Bearer <token>` header on every request.
2. **In-memory sessions.** Tokens are stored in a `Map` in the server's memory. If the server restarts, everyone is logged out.
3. **MySQL database.** All users, tweets, follows, and likes live in a MySQL database. No ORM — raw SQL queries with `mysql2`.
4. **JSON only.** Every endpoint returns `{ "data": ... }` on success and `{ "error": "..." }` on failure.
5. **No tests yet.** There are no test files in the repo. That's a great place to contribute!

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
- `buddy status` — Is the knowledge here up to date?
- `buddy precheck` — Show docs that may be stale based on recent changes.
- `buddy open <name>` — Open a Buddy doc (try: `buddy open getting-started`).
- `buddy link <url>` — Save an important link with safe redaction.

In Copilot CLI (after `buddy agent` and `/agents add buddy`):
- Ask: *"Scan this repo and fill in .buddy/"*
- Ask: *"Where does login happen?"*
- Ask: *"Update buddy for my changes"* (before committing)
