import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Approved JS exception 1/5 (A4): the CSS media query alone cannot
    // gate JS-driven animation. When the reader has not opted into full
    // motion, skip creating the observer entirely — the reduced state
    // is already the CSS base (index.scss), so `.visible` is never
    // needed for content to be visible.
    const motionAllowed = window.matchMedia(
      "(prefers-reduced-motion: no-preference)"
    ).matches;
    if (!motionAllowed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
