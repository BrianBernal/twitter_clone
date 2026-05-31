🏠 [Home](../README_FOR_HUMANS.md) · [Getting Started](../GETTING_STARTED.md) · [Architecture](../ARCHITECTURE.md) · [Tech](../TECH_STACK.md) · [Integrations](../INTEGRATIONS.md) · [Repo Map](../MAP/repo_map.md) · [Links](../LINKS.md)

---

# Open Questions

> Things Buddy couldn't figure out from the repo alone. Help fill these in!

## ✅ Recently answered

These questions were answered by the 9 new commits between `1f9923b` and `69e6209`:

- **Database schema** — now answered by `src/config/sql_schema.sql` (full CREATE TABLE with indexes and `ON DELETE CASCADE`)
- **Indexes** — yes: `idx_user_id`, `idx_following_id`, `idx_tweet_id`
- **Foreign key CASCADE** — yes: all foreign keys use `ON DELETE CASCADE`
- **Database migration approach** — manual SQL via `src/config/sql_schema.sql` is the intended approach
- **Port default** — changed from `3000` to `4000`

## Missing pieces

- Are there any plans for testing? What test framework would be preferred?
- Is there a planned CI pipeline? (`.github/` folder has no workflow files)
- Should there be password/authentication improvements (bcrypt, JWT)?

## ✅ Recently answered

The following sections were resolved by implementation on May 31, 2026:

- **Lint/format conventions** — ESLint (flat config, `api/` + `app/`) + Prettier (shared root config, `semi: true`) + Husky/lint-staged. See `.buddy/NOTES/linter_setup_plan.md`.

## API design

- Should there be rate limiting?
- Is there any OpenAPI / Swagger documentation planned?
- Should the Postman collection be version-controlled and maintained as the API spec?
