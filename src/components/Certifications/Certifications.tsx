import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./Certifications.scss";

export default function Certifications() {
  const { t } = useTranslation();
  const gridRef = useScrollReveal<HTMLElement>();

  const certifications = [
    {
      name: t("certifications_0_name"),
      description: t("certifications_0_description"),
      link: "https://drive.google.com/file/d/1jCxd31DtJvMZhq6dY6m17JTouOe4Azjh/view?usp=sharing",
      date: "2019 - 2024",
    },
    {
      name: t("certifications_1_name"),
      description: t("certifications_1_description"),
      link: "https://drive.google.com/file/d/1UPztyTsnUnd7OuKXb3sxDuSnUPnSWGSO/view?usp=sharing",
      date: "2020",
    },
    {
      name: t("certifications_2_name"),
      description: t("certifications_2_description"),
      link: "https://drive.google.com/file/d/1164MDZckr6mvy-LDCfvr9iK-34MZb6k5/view?usp=sharing",
      date: "2021",
    },
    {
      name: t("certifications_3_name"),
      description: t("certifications_3_description"),
      link: "https://drive.google.com/file/d/1jSdNX-ZlHEPFfsfWIHKT-3rU1JpjQz1S/view?usp=sharing",
      date: "2021",
    },
  ];

  return (
    <section className="section certifications" id="certifications">
      <div className="content">
        <div className="title">{t("certifications_title")}</div>
        <article
          className="certifications__content__list reveal stagger-children"
          ref={gridRef}
        >
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="certifications__content__list__item"
              style={{ '--i': index } as React.CSSProperties}
            >
              <div className="certifications__content__list__item__name">
                {cert.name}
              </div>
              <div className="certifications__content__list__item__date">
                {cert.date}
              </div>
              <div className="certifications__content__list__item__description">
                {cert.description}
              </div>
              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="certifications__content__list__item__link"
              >
                <i className="pi pi-external-link"></i>
              </a>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
