🏠 [Home](../README_FOR_HUMANS.md) · [Getting Started](../GETTING_STARTED.md) · [Architecture](../ARCHITECTURE.md) · [Tech](../TECH_STACK.md) · [Integrations](../INTEGRATIONS.md) · [Repo Map](../MAP/repo_map.md) · [Links](../LINKS.md)

---

# Open Questions

> Things Buddy couldn't figure out from the repo alone. Help fill these in!

## Database schema

- What does the full `users` table schema look like? I can see the columns from the types and queries, but I haven't seen the actual `CREATE TABLE` statement. (See `src/types/index.ts` and `src/models/userModel.ts`)
- Are there any indexes beyond the primary keys?
- Are there any foreign key constraints with `ON DELETE CASCADE`?

## Missing pieces

- Are there any plans for testing? What test framework would be preferred?
- Is there a planned CI pipeline? (`.github/` folder exists but only has `FUNDING.yml`)
- Are there any lint or formatting conventions (ESLint, Prettier)?
- Should there be database migration files, or is manual SQL the intended approach?

## API design

- Should there be rate limiting?
- Should there be any password/authentication improvements (bcrypt, JWT)?
- Is there any OpenAPI / Swagger documentation planned?
