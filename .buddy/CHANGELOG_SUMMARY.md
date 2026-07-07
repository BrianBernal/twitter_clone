🏠 [Home](./README_FOR_HUMANS.md) · [Getting Started](./GETTING_STARTED.md) · [Architecture](./ARCHITECTURE.md) · [Tech](./TECH_STACK.md) · [Integrations](./INTEGRATIONS.md) · [Repo Map](./MAP/repo_map.md) · [Links](./LINKS.md)

---

# Recent Changes (Human-Friendly)

> Updates made when you ask Buddy to "update buddy" before committing.

## 2026-07-07 — Toast notifications, Chirp refactor, E2E tests, lint tooling (11 commits)

1. **`794f392` — feat: add toast notification system for API error feedback** 🔔
   - New `ToastProvider` + `useToast` context in `app/src/components/ui/Toast.tsx`
   - Toast shows error/success messages, auto-dismisses after 5s
   - Integrated into `main.tsx` wrapping the entire app
   - Hooks (`useAuth`, `useTweets`, `useUsers`) now call `toast.show()` on errors

2. **`ec64dea` — feat: implement Chirp frontend refactor per spec** 🎨
   - Complete frontend overhaul — the app is now called **"Chirp"**
   - **Layout system**: RootLayout (3-column grid), LeftSidebar, RightSidebar, MobileNav, MobileDrawer
   - **New routes**: `/followers`, `/following` (with auth guards)
   - **New components**: ComposeModal, TweetCard (redesigned), UserCard
   - **Tailwind CSS v4** replaces all CSS Modules — all styling via utility classes
   - **Midnight Velocity** design system: dark theme with `#0f1419` surface, `#1d9bf0` primary
   - Auth now uses `localStorage` (`twitter_clone_token` + `twitter_clone_user`) + custom `auth-change` event
   - Feed uses `useInfiniteQuery` for paginated loading
   - See full spec at `app/specs/refactor.md`

3. **`254d8e3` — chore: add look-and-feel opencode skill with Midnight Velocity design tokens** 🎯
   - Added `.agents/skills/look-and-feel/SKILL.md` — design standards for the "Midnight Velocity" system
   - Detailed color palette, typography (Inter + JetBrains Mono), spacing, elevation rules

4. **`72c97ee` — chore: add Stitch MCP server for UI design generation** 🧵
   - MCP config for `stitch.googleapis.com` in `opencode.json`
   - Uses `STITCH_API_KEY` environment variable

5. **`7304c74` — chore: add tailwind-design-system opencode skill** 🎨
   - Installed `.opencode/skills/tailwind-design-system/` with advanced Tailwind patterns

6. **`6cd19ac` — feat: add real-time auth reactivity and Playwright E2E test setup** 🧪
   - `auth-change` custom event dispatches on token set/clear for reactive layout re-renders
   - Playwright `playwright.config.ts` with 3 browser projects (Chromium, Firefox, WebKit)
   - `tests/auth.spec.ts` — sign up, sign in, sign out, auth redirect E2E tests
   - Web server config auto-starts API + App before tests

7. **`1b7d01e` — feat: add Playwright E2E testing with opencode subagents** 🤖
   - Opencode subagents for Playwright: `playwright-test-generator`, `playwright-test-healer`, `playwright-test-planner`
   - Prompts in `.opencode/prompts/`

8. **`b8dbf8d` + `217504c` — chore: install auto-detected opencode skills** 📦
   - `skills-lock.json` with auto-detected skills from registries
   - Skills installed: accessibility, composition-patterns, frontend-design, nodejs-backend-patterns, nodejs-best-practices, nodejs-express-server, react-best-practices, seo, typescript-advanced-types, vite
   - `.opencode/skills/tanstack-query/`, `.opencode/skills/tanstack-router/`

9. **`5d8b023` — refactor: enforce exports at end of file via no-restricted-syntax** 📐
   - ESLint `no-restricted-syntax` rule: all exports must be at end of file
   - Applied to root, api, and app ESLint configs

10. **`5e23b1c` — feat: add ESLint and Prettier with Husky pre-commit hooks** 🧹
    - Root `eslint.config.js` with TypeScript + Prettier integration
    - `api/eslint.config.js` (Node-focused) + `app/eslint.config.js` (React + Hooks + Refresh)
    - `.prettierrc` (semicolons, single quotes, trailing commas, 100 char width)
    - `.husky/pre-commit` runs `lint-staged` on staged files
    - New scripts: `lint`, `lint:fix`, `format`, `format:check`, `prepare`

11. **`ac2b098` + `7d574c5` + `42376f9` — docs: update README and buddy for monorepo** 📝
    - README updated for monorepo structure
    - Buddy knowledge base refreshed

## 2026-05-31 — Monorepo restructure with React frontend (1 commit)

12. **`0621978` — feat: restructure into monorepo with api/ and app/** 🏗️
    - 66 files changed, 3199 insertions — the biggest change yet!
    - Moved backend from `src/` into `api/src/`
    - Created `app/` workspace with React frontend
    - Set up pnpm workspaces (`pnpm-workspace.yaml`)
    - Root scripts orchestrate both workspaces

## 2026-05-30 — Initial project setup + Buddy agent + Schema files (12 commits)

(Previous history — see git log for details.)
