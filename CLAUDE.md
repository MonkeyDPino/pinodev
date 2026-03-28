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
`Header → Home → Experience → Projects → AboutMe → Certifications → Technologies → Footer`

Each component is co-located with its SCSS file under `src/components/<Name>/`.

**Shared patterns:**
- `src/styles/variables.scss` — SCSS variables for colors, widths, and layout constants. Import this in component SCSS files for consistency.
- `src/types/svgs.type.ts` — Union type `svgs` listing all available SVG icon names.
- `src/constants/svgs.ts` — Maps each `svgs` type key to its imported SVG path. To add a new icon: add the file to `src/assets/`, extend the `svgs` union type, and add the mapping in `svgsConstants`.
- `src/components/HeaderSection/` — Reusable section title component used by content sections.
- `src/components/buttons/VoltageButton` — Custom animated button that accepts an optional `svg` prop (typed as `svgs`) and an `onClick` handler.

**Styling:** SCSS with the PrimeReact `lara-dark-blue` theme. Dark background (`$primary-color: rgb(26,26,26)`), teal accent (`$secondary-color: #3bdad4`), yellow-green accent (`$third-color: #bbd83a`). Content sections use max-width `$max-width: 800px`.

**Static assets:** Profile and preview images live in `public/images/` as `.webp` files and are referenced via root-relative paths (e.g. `/images/profile.webp`).
