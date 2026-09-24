import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { cv } from "../../data/cv";
import type { YearMonth } from "../../types/cv.type";
import "./Certifications.scss";

function formatYearMonth(value: YearMonth): string {
  const [year, month] = value.split("-");
  return `${month}/${year}`;
}

export default function Certifications() {
  const { t } = useTranslation();
  const gridRef = useScrollReveal<HTMLElement>();

  return (
    <section className="section certifications" id="certifications">
      <div className="content">
        <div className="title">{t("certifications_title")}</div>
        <article
          className="certifications__content__list reveal stagger-children"
          ref={gridRef}
        >
          {cv.certifications.map((cert, index) => (
            <div
              key={cert.nameKey}
              className="certifications__content__list__item"
              style={{ '--i': index } as React.CSSProperties}
            >
              <div className="certifications__content__list__item__name">
                {t(cert.nameKey)}
              </div>
              <div className="certifications__content__list__item__date">
                {formatYearMonth(cert.awarded)}
              </div>
              <div className="certifications__content__list__item__description">
                {t(`certifications_${index}_description`)}
              </div>
              {cert.verifyUrl && (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="certifications__content__list__item__link"
                >
                  <i className="pi pi-external-link"></i>
                </a>
              )}
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
