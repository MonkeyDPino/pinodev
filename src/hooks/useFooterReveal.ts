import { useLayoutEffect, type RefObject } from "react";

// Mirrors `$bp-md` (variables.scss, 48rem/768px) — same JS-mirror pattern
// `SectionCube.tsx` uses for `$bp-lg` (`DESKTOP_MEDIA_QUERY`). Below this
// width the footer's 3-column grid stacks to one column and grows much
// taller, so the sticky reveal never applies there (T6: "only enable
// from $bp-md").
const FOOTER_REVEAL_MEDIA_QUERY = "(min-width: 48rem)";

/**
 * T6 — sticky footer reveal. Measures the footer's own rendered height
 * and writes it to `--footer-h` on the root element, so `Footer.scss`'s
 * `.footer-reveal-spacer` (a plain, inert block immediately before the
 * footer, same height) and the footer itself (`position: sticky;
 * bottom: 0` from `$bp-md`) stay the same size. Both live inside
 * `.footer-reveal`, a dedicated `position: relative` containing block —
 * that scoping is what keeps sticky positioning inert (the footer stays
 * out of flow, off-screen) until the reveal; without it, the footer's
 * default containing block is the whole document, and it renders
 * stuck-and-visible over every section for the entire scroll (confirmed
 * against a live repro before landing this fix). Once the reveal
 * starts, sticky holds the footer still at the viewport bottom for
 * exactly one spacer's height of additional scroll while the spacer's
 * own trailing edge scrolls up and off above it, uncovering the footer.
 *
 * `--footer-h` is written as `0px` — collapsing the spacer to nothing,
 * so the footer settles back into plain static flow — whenever either
 * fallback condition applies: below `$bp-md`, or whenever the footer is
 * taller than the current viewport (a short window with a tall stacked
 * footer never gets the reveal treatment).
 *
 * ResizeObserver (footer content changes: locale switch, font zoom,
 * column reflow) plus a `resize` listener (viewport dimension changes) —
 * deliberately not a scroll listener (A4 / design-taste-frontend 5.D).
 */
export function useFooterReveal(ref: RefObject<HTMLElement | null>): void {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const height = el.offsetHeight;
      const enabled =
        window.matchMedia(FOOTER_REVEAL_MEDIA_QUERY).matches &&
        height <= window.innerHeight;
      document.documentElement.style.setProperty(
        "--footer-h",
        enabled ? `${height}px` : "0px"
      );
    };

    update();
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(el);
    window.addEventListener("resize", update);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", update);
      document.documentElement.style.removeProperty("--footer-h");
    };
  }, [ref]);
}
