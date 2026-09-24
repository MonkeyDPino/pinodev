# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Type-check + production build (tsc -b && vite build)
npm run lint      # ESLint
npm run preview   # Preview production build
```

There are no tests configured in this project.

## Architecture

Personal portfolio site (Juan Esteban Pino) built with React 18 + TypeScript + Vite. Single-page app with scroll-based sections.

**Section order** (defined in `src/App.tsx`):
`Header → Home → Experience → Projects → AboutMe → Contact → Education → Certifications → Technologies → Footer`

Each component is co-located with its SCSS file under `src/components/<Name>/`.

**Data model:** `src/data/cv.ts` + `src/types/cv.type.ts` are the single typed source of truth for every language-agnostic CV fact (name, experience, projects, education, certifications, skills, languages). Components import from `cv.ts` instead of holding their own literal copy. Translatable prose lives only in `src/locales/{en,es}.json` and is referenced from `cv.ts` by i18n key (`*Key` fields), never duplicated. The `localeParity` assertion in `cv.type.ts` compares `keyof typeof en` against `keyof typeof es` and fails `tsc -b` the moment the two locale files' key sets drift apart — locale drift is a build failure, not a review promise.

**Shared patterns:**
- `src/styles/variables.scss` — the token layer. Semantic CSS custom properties (`--surface-page`, `--text-strong`, `--accent`, `--space-*`, `--fs-*`, `--radius-*`, `--dur-*`, etc.) are defined once on `:root` and re-resolved under `:root[data-theme="light"]`; component SCSS references a token by role, never a raw hex or px value. `$bp-sm/md/lg/xl` and the `from($bp)` mixin stay as Sass, because `@media` cannot read custom properties — every media query in `src/` goes through `from()`, mobile-first (min-width only).
- Theming: the `data-theme` attribute on `<html>` is **absent** for dark (the default; renders correctly with zero JS) and `"light"` is the only value ever explicitly set. An inline script in `index.html`'s `<head>` restores a stored `"light"` choice from `localStorage` before first paint, avoiding a flash of the wrong theme; `src/components/ThemeToggle/` writes the choice back on click.
- Motion: reduced motion is the **base** rendering everywhere in `src/`. No resting-state `opacity: 0`, transform offset, or `visibility: hidden` exists outside `@media (prefers-reduced-motion: no-preference)` — full motion (entrance keyframes, scroll-driven animation, the hero's variable-font resolve) is layered on only inside that query, so content never depends on animation or JS to become visible.
- `src/types/svgs.type.ts` — Union type `svgs` listing all available SVG icon names.
- `src/constants/svgs.ts` — Maps each `svgs` type key to its imported SVG path (for icons whose source asset renders correctly in a single fixed color). To add a new icon this way: add the file to `src/assets/`, extend the `svgs` union type, and add the mapping in `svgsConstants`. For an icon whose asset bakes in a fixed fill that would disappear against one theme (most brand/social marks), components instead inline the SVG directly with `fill`/`stroke="currentColor"` (e.g. `Home.tsx`'s `SocialIcon`, `Technologies.tsx`'s `MonoIcon`) so it resolves against whichever theme is active.
- `src/components/HeaderSection/` — the nav-link item rendered by `Header.tsx`'s desktop nav and mobile overlay (title + hash + optional click handler). It is not a per-section heading; each content section renders its own `<h2 className="title">` directly.

**Styling:** SCSS built entirely on the token layer above — no UI library, no glass/card recipe, no shadow except on the mobile-nav and gallery overlays. Dark is the default ground (`--surface-page`); light is a fully specified sibling under `:root[data-theme="light"]`. The accent is one violet → magenta → amber ramp: it resolves to amber (`--accent`) on dark and magenta on light, always the ramp end that contrasts with the ground. Content sections use `--width-content` (864px); the Projects and Footer bands break out to `--width-wide` (1200px).

**Static assets:** Profile and preview images live in `public/images/` as `.webp` files and are referenced via root-relative paths (e.g. `/images/profile.webp`).
