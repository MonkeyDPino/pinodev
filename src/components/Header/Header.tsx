import HeaderSection from "../HeaderSection/HeaderSection";
import Profile from "../Profile/Profile";
import "./Header.scss";
import { useState } from "react";

export default function Header() {
  const isOpen = useState(false);
  return (
    <header className="header">
      <div className="header__content">
        <Profile />
        <div className="header__nav">
          <HeaderSection title="Home" hash="home" />
          <HeaderSection title="Experience" hash="experience" />
          <HeaderSection title="Projects" hash="projects" />
          <HeaderSection title="About me" hash="about_me" />
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
            <HeaderSection title="Home" hash="home" />
            <HeaderSection title="Experience" hash="experience" />
            <HeaderSection title="Projects" hash="projects" />
            <HeaderSection title="About me" hash="about_me" />
          </div>
        )}
      </div>
    </header>
  );
}
