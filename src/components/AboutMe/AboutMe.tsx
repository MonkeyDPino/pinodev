import { useTranslation } from "react-i18next";
import "./AboutMe.scss";

export default function AboutMe() {
  const { t } = useTranslation();

  return (
    <section className="section about_me" id="about_me">
      <div className="content">
        <div className="title">{t("about_title")}</div>
        <div className="about_me__content">
          <div className="profile__picture">
            <img src="/images/profile.webp" alt="Profile" />
          </div>
          <p>
            {t("about_p1_pre")}
            <strong>{t("about_p1_bold")}</strong>
            {t("about_p1_post")}
          </p>
          <p>{t("about_p2")}</p>
          <p>
            {t("about_p3_pre")}
            <strong>{t("about_p3_bold")}</strong>
            {t("about_p3_post")}
          </p>
        </div>
      </div>
    </section>
  );
}
