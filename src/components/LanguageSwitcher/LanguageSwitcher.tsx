import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.scss";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("es") ? "es" : "en";

  return (
    <div className="language-switcher">
      <button
        className={`lang-btn${currentLang === "es" ? " active" : ""}`}
        onClick={() => i18n.changeLanguage("es")}
      >
        ES
      </button>
      <button
        className={`lang-btn${currentLang === "en" ? " active" : ""}`}
        onClick={() => i18n.changeLanguage("en")}
      >
        EN
      </button>
    </div>
  );
}
