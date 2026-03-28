import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import HeaderSection from "../HeaderSection/HeaderSection";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import "./Header.scss";

const CV_URLS: Record<string, string> = {
  en: "https://drive.google.com/file/d/1-CoRG3TYBhG3yUNETM18URDIOI_2vxm-/view?usp=sharing",
  es: "https://drive.google.com/file/d/1aRormKMmnFhqUGz-m2UZaVnH5MvuRo8S/view?usp=sharing",
};

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  const cvUrl = CV_URLS[i18n.language] ?? CV_URLS.en;

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
              <i className="pi pi-download" />
              {t("home_cv_button")}
            </a>
            <div className="header__breadcrumb" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <i className="pi pi-times" /> : <i className="pi pi-bars" />}
            </div>
          </div>
        </div>
      </header>
      {overlay}
    </>
  );
}
