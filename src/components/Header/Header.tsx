import { useTranslation } from "react-i18next";
import HeaderSection from "../HeaderSection/HeaderSection";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import Profile from "../Profile/Profile";
import "./Header.scss";
import { useState } from "react";

export default function Header() {
  const { t } = useTranslation();
  const isOpen = useState(false);

  return (
    <header className="header">
      <div className="header__content">
        <Profile />
        <div className="header__nav">
          <HeaderSection title={t("nav_home")} hash="home" />
          <HeaderSection title={t("nav_experience")} hash="experience" />
          <HeaderSection title={t("nav_projects")} hash="projects" />
          <HeaderSection title={t("nav_about")} hash="about_me" />
          <LanguageSwitcher />
        </div>
        <div
          className="header__breadcrumb"
          onClick={() => isOpen[1](!isOpen[0])}
        >
          {!isOpen[0] ? (
            <i className="pi pi-bars" />
          ) : (
            <i className="pi pi-times" />
          )}
        </div>
        {isOpen[0] && (
          <div className="header__nav_responsive">
            <HeaderSection title={t("nav_home")} hash="home" />
            <HeaderSection title={t("nav_experience")} hash="experience" />
            <HeaderSection title={t("nav_projects")} hash="projects" />
            <HeaderSection title={t("nav_about")} hash="about_me" />
            <LanguageSwitcher />
          </div>
        )}
      </div>
    </header>
  );
}
