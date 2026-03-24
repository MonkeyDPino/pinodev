import { useTranslation } from "react-i18next";
import "./Profile.scss";

export default function Profile() {
  const { t } = useTranslation();

  return (
    <div className="profile">
      <div className="profile__info">
        <span className="nickname">pinodev</span>
        <span className="description">{t("home_role")}</span>
      </div>
    </div>
  );
}
