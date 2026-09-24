import { useState, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import HeaderSection from "../HeaderSection/HeaderSection";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { cv } from "../../data/cv";
import "./Header.scss";

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const overlayId = useId();
  const overlayLabelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const cvUrl = cv.cvUrls[i18n.language as "en" | "es"] ?? cv.cvUrls.en;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Approved JS exception 6/6 — the mobile overlay's own focus trap,
  // the same pattern as the PR4 gallery modal applied to this surface.
  // On open: move focus in. While open: Tab/Shift+Tab never leave the
  // panel, Escape closes it. On close: focus returns to the toggle
  // button that opened it. Purely behavioural — no resting-state
  // opacity/transform/visibility change outside `no-preference`.
  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    if (!panel) return;

    const getFocusable = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));

    const focusables = getFocusable();
    (focusables[0] ?? panel).focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const trigger = menuButtonRef.current;
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [isOpen]);

  const overlay = isOpen && createPortal(
    <div className="header__overlay" id={overlayId} onClick={close}>
      <div
        className="header__overlay__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={overlayLabelId}
        ref={panelRef}
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
      >
        <h2 id={overlayLabelId} className="header__overlay__label visually-hidden">
          {t("nav_menu_label")}
        </h2>
        <nav className="header__overlay__nav" aria-label={t("nav_menu_label")}>
          <HeaderSection title={t("nav_home")} hash="home" onClick={close} />
          <HeaderSection title={t("nav_experience")} hash="experience" onClick={close} />
          <HeaderSection title={t("nav_projects")} hash="projects" onClick={close} />
          <HeaderSection title={t("nav_about")} hash="about_me" onClick={close} />
          <HeaderSection title={t("nav_contact")} hash="contact" onClick={close} />
        </nav>
        <div className="header__overlay__controls">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </div>,
    document.body
  );

  return (
    <>
      <header className="header">
        <div className="header__content">
          <span className="header__logo">{cv.shortName}</span>

          <nav className="header__nav" aria-label={t("nav_main_label")}>
            <HeaderSection title={t("nav_home")} hash="home" />
            <HeaderSection title={t("nav_experience")} hash="experience" />
            <HeaderSection title={t("nav_projects")} hash="projects" />
            <HeaderSection title={t("nav_about")} hash="about_me" />
            <HeaderSection title={t("nav_contact")} hash="contact" />
          </nav>

          <ThemeToggle />
          <LanguageSwitcher />

          <a
            href={cvUrl}
            target="_blank"
            rel="noreferrer"
            className="header__cv-btn"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3v13" />
              <path d="M6 11l6 6 6-6" />
              <path d="M4 21h16" />
            </svg>
            {t("home_cv_button")}
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            className="header__menu-toggle"
            aria-expanded={isOpen}
            aria-controls={overlayId}
            aria-label={t("nav_menu_label")}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            ) : (
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </header>
      {overlay}
    </>
  );
}
