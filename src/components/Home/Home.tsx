import { useTranslation } from "react-i18next";
import { svgsConstants } from "../../constants/svgs";
import VoltageButton from "../buttons/VoltageButton";
import "./Home.scss";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="section" id="home">
      <div className="content">
        <div className="home">
          <section className="info">
            <div className="title1">{t("home_greeting")}</div>
            <div className="title2">Juan Esteban Pino</div>
            <div className="role">{t("home_role")}</div>
            <p className="description">
              <b>{t("home_description_bold")}</b>{" "}
              <span className="third-color-dark">
                {t("home_description_colored")}
              </span>{" "}
              {t("home_description_plain")}
            </p>
            <section className="content__buttons">
              <div className="buttons">
                <VoltageButton
                  onClick={() => {
                    window.open(
                      "https://drive.google.com/file/d/1siS250uxdThB-UY0KvOyzffu_w2XiRtF/view?usp=sharing",
                      "_blank",
                      "noreferrer"
                    );
                  }}
                  title={t("home_cv_button")}
                  svg="download"
                />
                <div className="social">
                  <a
                    href="https://www.linkedin.com/in/juan-pino-vidal"
                    target="_blank"
                    rel="noreferrer"
                    className="button_icon"
                  >
                    <img src={svgsConstants.linkedin} alt="LinkedIn" />
                  </a>
                  <a
                    href="https://github.com/MonkeyDPino"
                    target="_blank"
                    rel="noreferrer"
                    className="button_icon"
                  >
                    <img src={svgsConstants.github} alt="GitHub" />
                  </a>
                  <a
                    href="https://www.instagram.com/juan.pino.02"
                    target="_blank"
                    rel="noreferrer"
                    className="button_icon"
                  >
                    <img src={svgsConstants.instagram} alt="Instagram" />
                  </a>
                </div>
              </div>
            </section>
          </section>
          <section className="image">
            <a href="#about_me">
              <div className="profile__image">
                <img src="/images/profile.webp" alt="Profile" />
              </div>
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}
