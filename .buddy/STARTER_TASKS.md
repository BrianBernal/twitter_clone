🏠 [Home](./README_FOR_HUMANS.md) · [Getting Started](./GETTING_STARTED.md) · [Architecture](./ARCHITECTURE.md) · [Tech](./TECH_STACK.md) · [Integrations](./INTEGRATIONS.md) · [Repo Map](./MAP/repo_map.md) · [Links](./LINKS.md)

---

# Starter Tasks

> Friendly first things to try in this repo so you build confidence. Pick **one** and ship it — small wins beat big plans.

## Warm-up (≈ 15 min)

- Run the project locally once. Follow `GETTING_STARTED.md` end-to-end and note any step that wasn't obvious.
- Run `pnpm lint` and `pnpm format:check` — make sure everything passes.
- Run `npx playwright test` — watch the E2E auth tests pass in the browser.
- Find one typo or unclear sentence in any `README` or `.buddy/*.md` and open a tiny PR fixing it.

## First real change (≈ 1–2 hrs)

- **Add a Playwright test** for a flow that isn't covered yet, like creating a tweet or following a user. See `tests/auth.spec.ts` for the pattern.
- **Add a feature to the ComposeModal**: show a character count that turns red when under 20 chars remaining (it already does this — double-check the implementation and make it perfect).
- **Fix the "Who to follow" sidebar** to exclude people the current user already follows (currently shows all other users).
- **Add loading skeletons** for the feed instead of just a spinner.
- **Pick a TODO or FIXME** comment from the codebase and turn it into a small PR.

## Learn the codebase by doing

- Trace a single user request from entry point → handler → response. Add a comment or doc explaining what you found.
- Read `app/specs/refactor.md` — the full "Chirp" frontend spec. Compare it to the actual code. Add a note if something doesn't match.
- Pick a folder you don't understand, read it for 20 minutes, then add one sentence about it to `MAP/repo_map.md`.
- Try adding a new route to the frontend (e.g., a settings page at `/settings`). Follow the pattern in `app/src/routes/` — TanStack Router picks it up automatically.

## Projects (≈ half day)

- **Set up CI with GitHub Actions**: run `lint`, `format:check`, `build`, and `npx playwright test` on push/PR.
- **Add a simple password field** to signup (and bcrypt hash it). This would mean updating the API, database schema, and frontend — a full-stack change!
- **Replace in-memory auth with JWT tokens** for persistent sessions across restarts.
- **Add Docker Compose** for the full stack (API + App + MySQL) so anyone can spin it up with one command.

## Tips

- **Ask early.** If a task takes >30 min just to understand, that itself is feedback worth sharing.
- **Tiny PRs win.** A one-line fix you ship today is better than a refactor you ship next month.
- **Update Buddy.** When you learn something new, add it to the matching `.buddy/*.md` doc so the next newcomer benefits.
