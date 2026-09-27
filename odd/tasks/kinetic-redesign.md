# Kinetic redesign (hybrid cube hero)

## Objective
Replace the current templated look with a kinetic, non-generic portfolio: a scroll-driven 3D cube hero whose six faces preview the main sections, followed by full flat sections with motion-led layouts.

## Problem
Every section repeats the same fade/stagger reveal, Certifications is a de-facto 3-equal-card row, two type families compete (Archivo + Newsreader serif), fonts load from a Google Fonts `<link>`, and visible copy contains em-dashes. The strongest asset (Archivo's variable `wdth`/`wght` axes) is used once.

## Why
Recruiters and tech leads scan fast; the site must be memorable in the first viewport without sacrificing scannable content below it.

## Scope
- In: visual layer, motion layer, fonts, tokens, section layouts, copy punctuation fixes.
- Out: CV content changes, IA changes (section order and anchor IDs stay), new pages, palette change.

## Constraints
- Keep the dark-first brand and the violet -> magenta -> amber ramp (previously approved; amber is the single accent on dark).
- Reduced motion is the base rendering: no resting `opacity: 0`, transform offset or `visibility: hidden` outside `@media (prefers-reduced-motion: no-preference)` / Motion's reduced-motion gating.
- `data-theme` contract unchanged (absent = dark, `"light"` only explicit value).
- `localeParity` must keep passing (`tsc -b`).
- Anchor IDs unchanged: `home, experience, projects, about_me, contact, education, certifications, technologies`.
- Motion via the `motion` package (`motion/react`) behind `LazyMotion`; no GSAP; no `window` scroll listeners; animate only `transform`, `opacity`, `clip-path` and font axes.
- Taste Skill dials: DESIGN_VARIANCE 8, MOTION_INTENSITY 9, VISUAL_DENSITY 3.

## Configuration
- TDD: off. Source: `CLAUDE.md` ("There are no tests configured in this project"). Runner: none.
- Applicable checks per task: `npm run build`, `npm run lint`, browser check (dark + light, reduced motion on + off) via `playwright-cli`.
- Delivery strategy: ask-on-risk (default). Chain strategy: feature-branch-chain (user choice). Integration branch `feat/kinetic-redesign` (from `main`); each task branch (e.g. `feat/kinetic-foundation`) opens its PR into `feat/kinetic-redesign`; one final PR brings `feat/kinetic-redesign` into `main`.
- Forecast: ~2,000-2,800 authored changed lines across 6 tasks (exceeds the ~400 budget, so the work ships as chained PRs).

## Tasks

- [x] **T1 Foundation** (route: delegated writer; trigger: 2+ non-trivial files) - commit `b810bbf` on `feat/kinetic-foundation`
  - Install `motion`; wrap the app in `LazyMotion` (`domAnimation` or `domMax` as needed) + `MotionConfig reducedMotion="user"`.
  - Self-host fonts: Archivo variable (with `wdth` + `wght` axes) and JetBrains Mono; remove the Google Fonts `<link>`s; keep metric-adjusted fallbacks.
  - Retire Newsreader: single display/body family (Archivo); JetBrains Mono only for technical labels (dates, stack tags).
  - Add `--font-mono` token.
  - Remove em-dashes / en-dash separators from visible copy in `en.json` and `es.json`.
  - Acceptance: build + lint pass; no `fonts.googleapis.com` request; no `—`/`–` in locale values; site renders identically in structure in both themes.
- [ ] **T2 Cube hero** (route: delegated writer)
  - Sticky stage inside a ~6-viewport container; faces Front=Home, Right=Experience, Back=Projects, Left=About, Top=Credentials, Bottom=Contact.
  - `useScroll` -> `useTransform` -> `useSpring` drives `rotateY` through the 4 side faces, then `rotateX` for top/bottom; CSS scroll-snap point per face.
  - Faces not facing the viewer are `inert`; clicking a face scrolls to its full section.
  - Fallback: reduced motion or below `$bp-md` renders a flat hero + preview link list (no 3D).
  - Acceptance: rotation smooth, rests square at every snap, keyboard focus only reaches the visible face, fallback verified.
- [ ] **T3 Experience timeline** (StoryStream-style rail: sticky dates, ramp-filled rail, word-by-word outcome reveal).
- [ ] **T4 Projects** (horizontal scroll pan inside a sticky section; `layoutId` shared-element expansion into the gallery; vertical scroll-snap fallback on mobile / reduced motion).
- [ ] **T5 About / Technologies / Credentials** (scroll word reveal manifesto; single velocity-reactive marquee; offset credentials list replacing the 3-equal-card row).
- [ ] **T6 Header / Footer / Contact** (header face indicator while inside the cube; sticky reveal footer; magnetic contact CTA).

## Progress
- Branch `feat/kinetic-foundation` created from `main`; integration branch `feat/kinetic-redesign` created at the same `main` commit.
- T1 delegated to one writer (trigger: 2+ non-trivial files: index.html, main/App entry, index.scss, variables.scss, locales).
- Pushed `feat/kinetic-redesign` (seeded with an empty commit so the tracker PR can open) and `feat/kinetic-foundation`. Tracker PR #11 (draft, into `main`); T1 PR #12 (into `feat/kinetic-redesign`, 289 changed lines).
- T2 branch `feat/kinetic-cube` created from `feat/kinetic-foundation`; T2 delegated to one writer (trigger: 2+ non-trivial files: Home rebuild, SCSS, locales, hook).

## Verification evidence
- T1 (`b810bbf`):
  - `npm run build`: pass (writer + parent spot check); Archivo `wdth` and JetBrains Mono woff2 emitted to `dist/assets`.
  - `npm run lint`: pass (writer).
  - `rg "fonts.googleapis|fonts.gstatic|Newsreader" index.html src`: no matches; `rg "—|–" src/locales`: no matches.
  - Browser (`vite preview`, playwright-cli): loaded faces `Archivo Variable 62%-125%` + fallback; 0 Google Fonts requests; 0 console errors; dark and light screenshots render.
  - Not yet checked: reduced-motion emulation (no motion added in T1, nothing to gate).
  - RDD assess (`--base-ref main --committed-only`, untracked excluded): risk `medium` (`executable_change: index.html`), 282 changed lines, `review_due: false`, reason `under_budget`. Slice stays pending; reviewed boundary remains `main`.
- Note: dropping Newsreader leaves the hero positioning line with its old serif-tuned line-height; revisit in T2 (hero is being rebuilt).

- T2 first pass (uncommitted): mechanics verified by writer and parent spot check (build pass; 6 upright rest poses; inert gating; flat fallback under reduced motion and at 390px; 0 console errors; rotation keyframes documented in writer report). Parent visual review rejected composition: face too large and clipped under the header, content in left half only, name not bold/wide at rest. One scoped correction sent to the same writer (size below header, full-face poster composition with `cqi` type, bold wide rest state).
- T2 size: ~867 changed lines after first pass (over the 400 budget). Slicing pass: cube and its flat fallback share one component and one stylesheet; splitting would ship a half-built hero. Plan: PR with `size:exception` rationale unless the correction shrinks it.

## Next step
T2 Cube hero: verify the correction, commit, RDD assess, PR into `feat/kinetic-foundation`.
