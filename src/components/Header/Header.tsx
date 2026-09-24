import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import HeaderSection from "../HeaderSection/HeaderSection";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { cv } from "../../data/cv";
import "./Header.scss";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  const cvUrl = cv.cvUrls[i18n.language as "en" | "es"] ?? cv.cvUrls.en;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const overlay = isOpen && createPortal(
    <div className="header__overlay" onClick={close}>
      <div className="header__overlay__content" onClick={e => e.stopPropagation()}>
        <div className="header__overlay__label">MENU</div>
        <nav className="header__overlay__nav">
          <HeaderSection title={t("nav_home")} hash="home" onClick={close} />
          <HeaderSection title={t("nav_experience")} hash="experience" onClick={close} />
          <HeaderSection title={t("nav_projects")} hash="projects" onClick={close} />
          <HeaderSection title={t("nav_about")} hash="about_me" onClick={close} />
          <HeaderSection title={t("nav_contact")} hash="contact" onClick={close} />
        </nav>
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
    </div>,
    document.body
  );

  return (
    <>
      <header className="header">
        <div className="header__content">
          <span className="header__logo">PINODEV</span>

          <div className="header__nav">
            <HeaderSection title={t("nav_home")} hash="home" />
            <HeaderSection title={t("nav_experience")} hash="experience" />
            <HeaderSection title={t("nav_projects")} hash="projects" />
            <HeaderSection title={t("nav_about")} hash="about_me" />
            <HeaderSection title={t("nav_contact")} hash="contact" />
            <ThemeToggle />
            <LanguageSwitcher />
          </div>

          <div className="header__right">
            <a href="#contact" className="header__contact-btn">
              {t("nav_contact")}
            </a>
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
            <div className="header__breadcrumb" onClick={() => setIsOpen(!isOpen)}>
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
            </div>
          </div>
        </div>
      </header>
      {overlay}
    </>
  );
}
