import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.scss";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("es") ? "es" : "en";

  return (
    <div className="language-switcher">
      <button
        type="button"
        className={`lang-btn${currentLang === "es" ? " active" : ""}`}
        aria-pressed={currentLang === "es"}
        onClick={() => i18n.changeLanguage("es")}
      >
        ES
      </button>
      <button
        type="button"
        className={`lang-btn${currentLang === "en" ? " active" : ""}`}
        aria-pressed={currentLang === "en"}
        onClick={() => i18n.changeLanguage("en")}
      >
        EN
      </button>
    </div>
  );
}
