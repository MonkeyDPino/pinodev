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
- [x] **T2 Side section cube** (route: delegated writer; trigger: 2+ non-trivial files) - rework commit `7b78d74` on `feat/kinetic-cube`
  - Reopen reason: the user rejected the cube hero (`b0f030d`, never pushed) after review: it delays recruiters (scroll spent rotating before content) and is not intuitive. User chose option B: a sticky cube on the left that shows the current section and rotates as the full sections scroll by beside it.
  - From `$bp-lg`: two-column layout, sticky cube column on the left (replaces the `.spine` indicator), sections on the right scrolling natively.
  - Each visible face: Phosphor icon, section title, one key fact (JetBrains Mono). All 8 sections supported: ring-only `rotateY` (-90deg per section) on 4 physical faces, with the upcoming slots' content swapped before they turn into view.
  - Active section from `IntersectionObserver` (no scroll listeners); rotation animated with a Motion spring so it is interruptible in both scroll directions.
  - Cube is decorative (`aria-hidden`); the header nav stays the navigation. Below `$bp-lg`: no cube. Reduced motion: face content swaps without rotation (`MotionConfig reducedMotion="user"`).
  - Home returns to a normal hero with the pointer-driven kinetic name (rest `wdth 112, wght 700`); the cube hero, snap markers and preview list are removed.
  - Acceptance: the cube always matches the section being read (forward and backward), no overlap with wide bands (Projects, Footer), build + lint pass, both themes, reduced motion, 1024 and 1440 widths, no cube at 390px.
  - History: first implementation (cube hero) `b0f030d`; kept in branch history and replaced by the rework commit.
- [ ] **T3 Experience timeline** (StoryStream-style rail: sticky dates, ramp-filled rail, word-by-word outcome reveal).
- [ ] **T4 Projects** (large asymmetric project grid; `layoutId` shared-element expansion into the gallery). Horizontal scroll pan dropped: it would compete with the rotating side cube.
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

- T2 correction (`b0f030d`): stage pinned below the header (`top: var(--header-h)`), cube `min(62vmin, 34rem)`, face-relative sizes via `calc(var(--cube-size) * n)` because `cqi` resolved wrongly inside the `perspective` + `preserve-3d` stack (gotcha for T3-T6), name rests at `wdth 112, wght 700` and springs back on pointer leave.
  - Writer: `npm run build` pass, `npm run lint` pass; 6 rest poses + 3 mid-transition frames (incl. X tip) with no clipping; light theme; reduced-motion flat; 390px flat; inert focus gating; hash navigation; 0 console errors.
  - Parent spot check: `npm run build` pass; reviewed front rest, left-to-top mid-transition and top rest screenshots.
  - Follow-up for T5: Credentials face shows 5 logos in a 3-column grid (one empty cell; Taste Skill bento cell-count rule).
  - RDD assess (`--base-ref main --committed-only`, untracked excluded): risk `medium`, 1269 lines, `review_due: true` (`slice_budget_reached`). Preflight STATUS returned `collect: intended_untracked_selection_required`; two submissions of an empty selection were refused (`invalid_request: must be exact gentle-ai.review-intended-untracked-selection/v1 JSON`) and the schema shape is not documented locally. Native review treated as unavailable for this slice; followed the off path at tier `medium` (writer self-verification + parent spot check). Reviewed boundary not advanced (still `main`).
  - Size: `size:exception` for the T2 PR (cube + flat fallback share one component; no cohesive smaller cut).

- User rejected the cube hero; T2 reopened as the side section cube (see T2). T4 horizontal pan dropped.

- T2 rework (`7b78d74`): `SectionCube` (sticky left column from `$bp-lg`, 4-face ring, `rotateY -90deg * active`, spring `bounce 0.15, visualDuration 0.6`, slot `s % 4` pre-fill for neighbours, `IntersectionObserver` band `-45% 0px -50% 0px`, `aria-hidden`, Phosphor regular icons, `cube_fact_*` keys from `cv.ts`, resting tilt `rotateX(-12deg) rotateY(-20deg)` on a wrapper); `.spine` removed; Home is a single-viewport hero with the kinetic name; `@phosphor-icons/react` added. Net vs T1: 12 files, +571/-297.
  - Writer: build pass, lint pass, 8 sections forward + 3 reverse at 1440 match, 1024 no overlap, 390 no cube and no horizontal scroll, light theme, reduced motion instant swap, name rest `wdth 112 / wght 700`, 0 console errors; one correction round (resting tilt).
  - Parent spot check: build pass; reviewed home, experience (rest) and technologies (mid-turn) screenshots.
  - RDD assess: `medium`, 1105 lines, `review_due: true` (`slice_budget_reached`). Same preflight blocker as before (intended-untracked selection refused, schema undocumented); native review unavailable, off path at tier `medium`. Unblock option: resolve the 4 untracked files (commit or ignore `.mcp.json`; move or ignore the 3 personal assets) so the untracked inventory is empty.
  - Size: T2 PR over 400 lines; `size:exception` rationale: layout grid, new component, hero rewrite and cube-hero removal are one cohesive swap.

## Next step
Push `feat/kinetic-cube` and open the T2 PR into `feat/kinetic-foundation` (awaiting user OK), then T3 Experience timeline.
