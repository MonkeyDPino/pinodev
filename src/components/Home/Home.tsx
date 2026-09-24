import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { svgsConstants } from "../../constants/svgs";
import { techLabels } from "../../constants/techLabels";
import { cv } from "../../data/cv";
import "./Home.scss";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const cvUrl = cv.cvUrls[i18n.language as "en" | "es"] ?? cv.cvUrls.en;

  return (
    <main className="section" id="home">
      <div className="content">
        <div className={`home ${mounted ? "home--visible" : ""}`}>
          <section className="info">
            <div className="title1 home-item" style={{ "--delay": "0" } as React.CSSProperties}>{t("home_greeting")}</div>
            <div className="title2 home-item" style={{ "--delay": "1" } as React.CSSProperties}>
              {cv.nameLines.join(" ")}
            </div>
            <div className="role home-item" style={{ "--delay": "2" } as React.CSSProperties}>{t("home_role")}</div>
            <div className="location home-item" style={{ "--delay": "2" } as React.CSSProperties}>{cv.location}</div>
            <p className="description home-item" style={{ "--delay": "3" } as React.CSSProperties}>
              <b>{t("home_description_bold")}</b>{" "}
              <span className="third-color-dark">
                {t("home_description_colored")}
              </span>{" "}
              {t("home_description_plain")}
            </p>
            <section className="content__buttons home-item" style={{ "--delay": "4" } as React.CSSProperties}>
              <div className="buttons">
                <div className="social">
                  {cv.socials.map((social) => (
                    <a
                      key={social.kind}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="button_icon"
                    >
                      <img src={svgsConstants[social.kind]} alt={t(social.labelKey)} />
                    </a>
                  ))}
                </div>
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="home__cv-button"
                >
                  {t("home_cv_button")}
                </a>
              </div>
            </section>

            <section className="home__stack home-item" style={{ "--delay": "5" } as React.CSSProperties}>
              {cv.stack.map((layer) => (
                <div key={layer.layerKey} className="home__stack__row">
                  <span className="home__stack__layer">{t(layer.layerKey)}</span>
                  <span className="home__stack__technologies">
                    {layer.items.map((item) => techLabels[item]).join(" ")}
                  </span>
                </div>
              ))}
            </section>
          </section>
          <section className="image home-item" style={{ "--delay": "5" } as React.CSSProperties}>
            <a href="#about_me">
              <div className="profile__image">
                <img src={cv.portrait} alt="Profile" />
              </div>
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}
