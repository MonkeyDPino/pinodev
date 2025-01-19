import HeaderSection from "../HeaderSection/HeaderSection";
import Profile from "../Profile/Profile";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <Profile />
        <div className="header__nav">
          <HeaderSection title="Home" />
          <HeaderSection title="Experience" />
          <HeaderSection title="Projects" />
          <HeaderSection title="About me" />
        </div>
      </div>
    </header>
  );
}
