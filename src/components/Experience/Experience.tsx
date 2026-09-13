import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { cv } from "../../data/cv";
import type { YearMonth } from "../../types/cv.type";
import "./Experience.scss";

function formatYearMonth(value: YearMonth): string {
  const [year, month] = value.split("-");
  return `${month}/${year}`;
}

export default function Experience() {
  const { t } = useTranslation();
  const listRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="section experience" id="experience">
      <div className="content">
        <div className="title">{t("experience_title")}</div>
        <div
          className="experience__list reveal stagger-children"
          ref={listRef}
        >
          {cv.experience.map((item, index) => (
            <div
              key={item.company}
              className="experience__card"
              style={{ '--i': index } as React.CSSProperties}
            >
              <div className="experience__card__header">
                <div>
                  <span className="role">{t(item.roleKey)}</span>
                  <span className="company"> — {item.company}</span>
                </div>
                <span className="date">
                  {formatYearMonth(item.start)} -{" "}
                  {item.end ? formatYearMonth(item.end) : t("experience_current")}
                </span>
              </div>
              <p className="description">{t(item.descriptionKey)}</p>
              {item.outcomes.length > 0 && (
                <ul className="experience__card__outcomes">
                  {item.outcomes.map((outcome) => (
                    <li key={outcome.labelKey}>
                      <strong>{outcome.figure}</strong> {t(outcome.labelKey)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
