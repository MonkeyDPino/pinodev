import { useState } from "react";
import { useTranslation } from "react-i18next";
import HeaderSection from "../HeaderSection/HeaderSection";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import "./Header.scss";

export default function Header() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <header className="header">
      <div className="header__content">
        <span className="header__logo">JP</span>

        <div className="header__nav">
          <HeaderSection title={t("nav_home")} hash="home" />
          <HeaderSection title={t("nav_experience")} hash="experience" />
          <HeaderSection title={t("nav_projects")} hash="projects" />
          <HeaderSection title={t("nav_about")} hash="about_me" />
          <HeaderSection title={t("nav_contact")} hash="contact" />
          <LanguageSwitcher />
        </div>

        <div className="header__breadcrumb" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <i className="pi pi-times" /> : <i className="pi pi-bars" />}
        </div>
      </div>

      {isOpen && (
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
        </div>
      )}
    </header>
  );
}
