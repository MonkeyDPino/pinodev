import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./ThemeToggle.scss";

const THEME_KEY = "pinodev-theme";

/**
 * A2 — dark is the CSS default (`:root`, no attribute). The attribute is
 * ABSENT for dark and is only ever written as `data-theme="light"` for an
 * explicit, persisted choice; writing `data-theme="dark"` would make the
 * default rendering depend on JS having run, which is the exact failure
 * mode this design removes.
 *
 * The theme never passes through app-wide React state or context — this
 * component reads/writes the DOM attribute and `localStorage` directly and
 * never triggers a re-render anywhere else in the tree.
 */
export default function ThemeToggle() {
  const { t } = useTranslation();
  const [isLight, setIsLight] = useState(
    () => document.documentElement.getAttribute("data-theme") === "light"
  );

  const toggleTheme = () => {
    const nextIsLight = !isLight;
    if (nextIsLight) {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem(THEME_KEY, nextIsLight ? "light" : "dark");
    } catch {
      // Storage blocked (private mode, disabled cookies, etc.) — the
      // toggle still works for the current session.
    }
    setIsLight(nextIsLight);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={t(isLight ? "theme_to_dark" : "theme_to_light")}
    >
      <span className="theme-toggle__glyphs" aria-hidden="true">
        <svg
          className={`theme-toggle__glyph theme-toggle__glyph--sun${isLight ? " theme-toggle__glyph--active" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
        </svg>
        <svg
          className={`theme-toggle__glyph theme-toggle__glyph--moon${!isLight ? " theme-toggle__glyph--active" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
        </svg>
      </span>
    </button>
  );
}
