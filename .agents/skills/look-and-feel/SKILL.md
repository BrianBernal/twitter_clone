---
name: look-and-feel
description: Manage and enforce design standards for the Twitter Clone. Use when the user asks about theming, styling, CSS, colors, typography, layout, spacing, component appearance, or visual design consistency. Also use for look-and-feel, design standards, brand guidelines, visual language, or UI consistency.
---

# Midnight Velocity — Design Standards

This project uses the **Midnight Velocity** design system. All UI work must follow these tokens and guidelines. Do not introduce custom colors, fonts, radii, or spacing outside this system.

## Design Philosophy

The brand personality is high-efficiency, technical, and focused — targeting a developer/power-user audience who value speed and clarity over ornamentation. The UI evokes a "flow state" where the interface recedes to let communication and information take center stage.

Design style: **Corporate Modern with a Developer Edge** — deep dark-mode surfaces, vibrant high-energy accents, card-based architecture prioritizing content density without sacrificing legibility.

## Colors

The palette is anchored in near-black and deep-charcoal to maximize contrast for the primary accent.

### Token Reference

| Token                         | Hex       | Usage                                   |
| ----------------------------- | --------- | --------------------------------------- |
| `--surface` / `--background`  | `#0f1419` | App background, page base               |
| `--surface-dim`               | `#0f1419` | Same as base                            |
| `--surface-bright`            | `#353a3f` | Elevated surfaces                       |
| `--surface-container-lowest`  | `#0a0f14` | Deepest surface layer                   |
| `--surface-container-low`     | `#171c21` | Slightly raised                         |
| `--surface-container`         | `#1b2025` | Card/sheet background                   |
| `--surface-container-high`    | `#252a30` | Hover states                            |
| `--surface-container-highest` | `#30353b` | Active/pressed states                   |
| `--surface-variant`           | `#30353b` | Variant surfaces                        |
| `--on-surface`                | `#dee3ea` | Primary text                            |
| `--on-surface-variant`        | `#bfc7d3` | Secondary text, metadata                |
| `--primary`                   | `#99cbff` | High-contrast primary text/icon         |
| `--primary-container`         | `#1d9bf0` | Primary buttons, links, active states   |
| `--on-primary`                | `#003354` | Text on primary fills                   |
| `--on-primary-container`      | `#003050` | Text on primary-container               |
| `--secondary`                 | `#ffb1c5` | Secondary/destructive text              |
| `--secondary-container`       | `#ff4a8f` | Destructive buttons, error fills, likes |
| `--on-secondary`              | `#65002f` | Text on secondary fills                 |
| `--on-secondary-container`    | `#590029` | Text on secondary-container             |
| `--tertiary`                  | `#ffb875` | Tertiary accent (warnings, highlights)  |
| `--tertiary-container`        | `#db7e00` | Tertiary fills                          |
| `--outline`                   | `#89919d` | Borders, dividers                       |
| `--outline-variant`           | `#3f4851` | Subtle borders                          |
| `--error`                     | `#ffb4ab` | Error text                              |
| `--error-container`           | `#93000a` | Error fills                             |
| `--inverse-surface`           | `#dee3ea` | Inverse surface (for dark-on-light)     |
| `--inverse-on-surface`        | `#2c3136` | Text on inverse surface                 |
| `--inverse-primary`           | `#00629d` | Primary on inverse surface              |

### Color Usage Rules

- **Primary actions** → `--primary-container` (`#1d9bf0`) background with `--on-primary-container` text
- **Destructive actions / likes** → `--secondary-container` (`#ff4a8f`)
- **Card backgrounds** → `--surface-container` (`#1b2025`)
- **Hover on interactive items** → `--surface-container-high` (`#252a30`)
- **Active/pressed** → `--surface-container-highest` (`#30353b`)
- **Borders** → `--outline-variant` (`#3f4851`) for subtle, `--outline` (`#89919d`) for prominent
- **Primary text** → `--on-surface` (`#dee3ea`)
- **Secondary text (timestamps, handles)** → `--on-surface-variant` (`#bfc7d3`)

## Typography

### Font Families

| Role                        | Font               | Weight used   |
| --------------------------- | ------------------ | ------------- |
| Headlines / Body            | **Inter**          | 400, 700, 800 |
| Labels / Metadata / Utility | **JetBrains Mono** | 700           |

### Type Scale

| Token         | Font           | Size | Weight | Line Height | Letter Spacing |
| ------------- | -------------- | ---- | ------ | ----------- | -------------- |
| `headline-lg` | Inter          | 32px | 800    | 1.2         | -0.02em        |
| `headline-md` | Inter          | 20px | 700    | 1.4         | normal         |
| `body-lg`     | Inter          | 15px | 400    | 1.5         | normal         |
| `body-sm`     | Inter          | 13px | 400    | 1.4         | normal         |
| `label-caps`  | JetBrains Mono | 11px | 700    | 16px        | 0.1em          |

### Typography Rules

- **Headlines**: Bold, tightly tracked. Mobile headline-lg scales to 24px.
- **Body**: Standard tweet text uses `body-lg` (15px). Metadata uses `body-sm` (13px).
- **Labels**: Monospaced `label-caps` for timestamps, handle badges, demo-account labels, and utility UI.
- **Weights**: Weight drives hierarchy. No italic usage in this system.

## Layout & Spacing

### Grid

| Breakpoint | Structure                                                |
| ---------- | -------------------------------------------------------- |
| Desktop    | 3-column: nav rail 275px, feed 600px max, aside 350px    |
| Tablet     | Nav collapses to icon rail, feed expands, aside hidden   |
| Mobile     | Bottom nav bar, feed 100% width, 16px horizontal margins |

### Spacing Rhythm

| Token                | Value  |
| -------------------- | ------ |
| Base unit            | 4px    |
| Gutter               | 16px   |
| Container max        | 1200px |
| Sidebar width        | 275px  |
| Aside width          | 350px  |
| Default card padding | 16px   |

All spacing is built on a 4px baseline grid. Internal component padding uses 12px or 16px for compact, data-rich density.

## Elevation & Depth

Depth is communicated through **tonal layering** and **low-contrast outlines**, not shadows.

| Level                | Surface                                                    | Borders                 |
| -------------------- | ---------------------------------------------------------- | ----------------------- |
| 0 (Base)             | `#0f1419`                                                  | none                    |
| 1 (Cards/Containers) | `--surface-container` (`#1b2025`)                          | 1px `--outline-variant` |
| 2 (Hover/Active)     | `--surface-container-high` / `--surface-container-highest` | 1px `--outline-variant` |

**Modal/Overlay shadow**: `0px 8px 24px rgba(255, 255, 255, 0.05)` — white-tinted, very diffused.

## Shapes / Border Radius

| Token     | Value          | Usage                                    |
| --------- | -------------- | ---------------------------------------- |
| `sm`      | 0.25rem (4px)  | Small indicators                         |
| `DEFAULT` | 0.5rem (8px)   | Buttons, input fields, standard elements |
| `md`      | 0.75rem (12px) | Cards, larger containers                 |
| `lg`      | 1rem (16px)    | Main feed items, large cards             |
| `xl`      | 1.5rem (24px)  | Outer containers, modals                 |
| `full`    | 9999px         | Avatars, pill buttons                    |

**Avatar shape**: Strictly circular (`full`/pill) to provide organic contrast against the geometric layout.

## Components

### Buttons

| Variant           | Style                                                                               |
| ----------------- | ----------------------------------------------------------------------------------- |
| Primary           | Solid `--primary-container` bg, `--on-primary-container` text, bold, DEFAULT radius |
| Secondary / Ghost | 1px `--outline-variant` border, no fill, `--on-surface` text                        |
| Destructive       | Solid `--secondary-container` bg, `--on-secondary` text                             |

### Input Fields

- Background: `#1D2126` (dark fill)
- Borders: 1px `--outline-variant`
- Labels: `label-caps` monospaced style
- Focus: 1px `--primary-container` ring
- Placeholder color: `--on-surface-variant`

### Cards

- Background: `--surface-container`
- Border: 1px `--outline-variant` (no drop shadow)
- Internal padding: 16px

### Chips & Badges

- Font: `label-caps` (JetBrains Mono, 11px, bold, 0.1em letter-spacing)
- Background: 10% opacity of the status color (e.g., 10% blue for info)

### Feed Items

- Separated by 1px `--outline-variant` bottom border (not margin-based gaps)
- No outer card container in the main timeline to maximize horizontal space

## Implementation Notes

- All colors must be defined as CSS custom properties on `:root`.
- Use `var(--token-name)` throughout — never hardcode hex values.
- Tailwind: extend the theme with these tokens rather than using arbitrary values.
- On mobile, headline-lg scales down to 24px to avoid awkward wrapping on narrow viewports.
- The sign-in flow is intentionally passwordless (single email input) — "frictionless entry" principle.
