import { useEffect, useState } from "react";

/**
 * Synchronous initial value from `window.matchMedia`, so the first render
 * already reflects reality instead of flashing an assumed default and then
 * correcting itself after mount. Reactive afterwards via the `change`
 * event, so flipping the OS reduced-motion setting or resizing across the
 * query's breakpoint mid-session switches modes live.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQueryList.matches);

    handleChange();
    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
