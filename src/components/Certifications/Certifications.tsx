import { useTranslation } from "react-i18next";
import "./Certifications.scss";

export default function Certifications() {
  const { t } = useTranslation();

  const certifications = [
    {
      name: "Systems and Computer Engineering - Universidad Tecnológica de Pereira",
      description: t("certifications_0_description"),
      link: "https://drive.google.com/file/d/1jCxd31DtJvMZhq6dY6m17JTouOe4Azjh/view?usp=sharing",
      date: "2019 - 2024",
    },
    {
      name: "Python Data Structures - University of Michigan",
      description: t("certifications_1_description"),
      link: "https://drive.google.com/file/d/1UPztyTsnUnd7OuKXb3sxDuSnUPnSWGSO/view?usp=sharing",
      date: "2020",
    },
    {
      name: "Programming Skills - Universidad de Antioquia",
      description: t("certifications_2_description"),
      link: "https://drive.google.com/file/d/1164MDZckr6mvy-LDCfvr9iK-34MZb6k5/view?usp=sharing",
      date: "2021",
    },
    {
      name: "Web Application Development - Universidad de Antioquia",
      description: t("certifications_3_description"),
      link: "https://drive.google.com/file/d/1jSdNX-ZlHEPFfsfWIHKT-3rU1JpjQz1S/view?usp=sharing",
      date: "2021",
    },
  ];

  return (
    <section className="section certifications" id="certifications">
      <div className="content">
        <div className="title">{t("certifications_title")}</div>
        <div className="certifications__content">
          <article className="certifications__content__list">
            {certifications.map((certification, index) => (
              <div key={index} className="certifications__content__list__item">
                <div className="certifications__content__list__item__name">
                  {certification.name}
                </div>
                <div className="certifications__content__list__item__date">
                  {certification.date}
                </div>
                <div className="certifications__content__list__item__description">
                  {certification.description}
                </div>
                <a
                  href={certification.link}
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
      </div>
    </section>
  );
}
