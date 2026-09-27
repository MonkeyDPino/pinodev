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
- [x] **T3 Experience timeline** (route: delegated writer; trigger: prep reading + 2 non-trivial files) - commit `ae96b94` on `feat/kinetic-experience`. Word-by-word reveal dropped for the long description (readability for recruiters); outcomes became counting metrics instead.
- [x] **T4 Projects** (route: delegated writer) - commit `3a9d116` on `feat/kinetic-projects`. Horizontal scroll pan dropped: it would compete with the rotating side cube.
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

- T2 user-feedback fix (`4efc15c`): user found the resting yaw confusing (next section visible on first look) and the rounded corners un-cube-like. Rest pose is now `rotateX(-16deg)` only; top/bottom caps (`--surface-sunken`) inside the ring; `border-radius: 0` with `--line-strong` edges. Writer: build + lint pass, rest/mid-turn/light/1024 screenshots, 0 console errors. Parent: build pass, reviewed experience rest and mid-turn screenshots.

- T2 user request (`ba2108a`): on mobile the cube shows in the header. `useActiveSection` hook extracted (shared by both instances); `SectionCube` `variant: "side" | "compact"`; compact icon-only cube `clamp(1.75rem, 6vw, 2.25rem)` next to the wordmark below `$bp-lg`; header gap `--space-3` below `$bp-sm`. Writer: build + lint pass; single-line header and `scrollWidth <= innerWidth` at 320/360/390/544/768 (EN + ES spot checks); icon tracks home/experience/projects at 390; light theme; reduced motion; no compact cube at 1440; 0 console errors. Parent: build pass, reviewed 390 experience and 320 ES screenshots.

- T2 user feedback (`734a2fb`, route: direct inline, 2 small mechanical edits): compact cube moved to the end of the header row; `.header__brand` takes `margin-inline-end: auto` below `$bp-lg` so the controls no longer leave a blank strip; gap `--space-2` below `$bp-sm`. Parent: build + lint pass; header row ends flush with the container (`rightGap 0`) at 320/360/390/544/768; no compact cube and unchanged layout at 1440.

- T2 user request (`f7a414e`, direct inline): desktop header had the same blank strip on the right; `.header__brand` now takes the free space at every width. Parent: build + lint pass; `rightGap 0` at 1024/1280/1440/390; screenshot at 1440 reviewed.
- User authorized: push `feat/kinetic-cube`, open the T2 PR into `feat/kinetic-foundation`, continue with T3.

- T2 PR #13 opened (`feat/kinetic-cube` -> `feat/kinetic-foundation`, 758+299, `size:exception`).
- T3 (`ae96b94`): rail = hairline track + `::after` ramp fill `scaleY` on a named `view-timeline` (`--experience-scroll`) on the section; square nodes lit via their own `view()` timeline; sticky meta column from `$bp-md` (`top: calc(var(--header-h) + var(--space-6))`), dates in `--font-mono`; `OutcomeMetric` counts up via `useInView` + `animate()` writing `textContent`, final value rendered first, gated by `useReducedMotion()`. 2 files, +215/-32.
  - Writer: build + lint pass, no dashes in locales; 1440 at 3 positions (rail fill + nodes + sticky confirmed), metrics mid-count and final `textContent` equal source (`~200`, `~15%`, `1`), 1024, 390 (no horizontal scroll), light theme, reduced motion (static rail, final values, nothing hidden), 0 console errors.
  - Parent: build pass; reviewed middle and metrics-final screenshots.
  - RDD assess: `medium`, 1541 lines cumulative, `review_due` (`slice_budget_reached`); native review still blocked by the untracked-selection preflight; off path at tier `medium`.

- T3 PR #14 opened (`feat/kinetic-experience` -> `feat/kinetic-cube`, 223+34).
- T4 (`3a9d116`): 6-cell bento via `grid-column: span` rows 7/5, 5/7, 6/6; mockups at native aspect ratio (`object-fit: contain`; gallery mockups 4:3, Giphy 1963x1116, Blog 1421x1104), text below the image, 2-line description clamp; Giphy + Blog are the two ramp spotlight tiles; radius 0 in cells; `layoutId="project-image-{slug}"` cover image shared between cell and modal inside `AnimatePresence` (portal stays mounted, condition inside); `LazyMotion` `domMax` (JS gzip 156.7 -> 172.8 kB); tokens `--on-media`, `--on-media-muted`. Parent added a DEV assertion that `BENTO_SLOTS` covers every `cv.ts` project (a renamed project would otherwise vanish silently).
  - Writer: build + lint pass; 1440/1024/390 (no horizontal scroll) + light; gallery by click and Enter, mid-transition frame, prev/next/dots, Escape, focus return, focus trap; external links `target=_blank rel=noreferrer`; reduced motion instant; 0 console errors. One correction round (mockups were cropped by `object-fit: cover`, text overlaid on images).
  - Parent: build + lint pass; reviewed grid, spotlight row and modal mid-transition screenshots. Known trade-off: narrower cells letterbox their 4:3 mockup (dark mat strip) instead of cropping.
  - Size: 456+242 (over 400); `size:exception`: grid, cells and the modal share one component and stylesheet rewrite.

## Next step
Push `feat/kinetic-projects`, open T4 PR into `feat/kinetic-experience`, then T5 About / Technologies / Credentials.
