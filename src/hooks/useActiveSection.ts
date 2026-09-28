import { useEffect, useState } from "react";

// Centre band: a section only counts as "active" once it has crossed the
// middle of the viewport, not merely entered it — this is what keeps the
// indicator settled on one section at a time instead of flickering between
// two adjacent ones near the fold.
const ROOT_MARGIN = "-45% 0px -50% 0px";

/**
 * Tracks which of `ids` (rendered as `id="..."` elements already in the
 * DOM, in document order) is currently centred in the viewport, via a
 * single `IntersectionObserver` — never a `scroll` listener (design-taste-
 * frontend 5.D). Shared by every consumer that needs to mirror the
 * reader's position (the side and compact `SectionCube` variants), so
 * their behaviour is identical by construction rather than by two
 * independently-tuned copies.
 *
 * Pass `enabled: false` to skip creating the observer entirely — used by
 * a mounted-but-inactive consumer (the off-breakpoint `SectionCube`
 * variant) so only one observer set is ever actually watching the page at
 * a time.
 */
export function useActiveSection(ids: readonly string[], enabled = true): number {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = ids.indexOf(entry.target.id);
          if (index === -1) continue;
          setActiveIndex((previous) => (previous === index ? previous : index));
        }
      },
      { rootMargin: ROOT_MARGIN, threshold: 0 },
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [ids, enabled]);

  return activeIndex;
}
