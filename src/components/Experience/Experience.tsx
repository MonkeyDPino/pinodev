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
        <h2 className="title">{t("experience_title")}</h2>
        <div
          className="experience__rail reveal stagger-children"
          ref={listRef}
        >
          {cv.experience.map((item, index) => (
            <article
              key={item.company}
              className="experience__entry"
              style={{ "--i": index } as React.CSSProperties}
            >
              <div className="experience__entry__rail">
                <span className="experience__entry__date">
                  {formatYearMonth(item.start)} –{" "}
                  {item.end ? formatYearMonth(item.end) : t("experience_current")}
                </span>
                {item.end === null && (
                  <span className="experience__entry__marker">
                    {t("experience_current_marker")}
                  </span>
                )}
              </div>

              <div className="experience__entry__content">
                <h3 className="experience__entry__company">{item.company}</h3>
                <p className="experience__entry__role">{t(item.roleKey)}</p>
                <p className="experience__entry__description">
                  {t(item.descriptionKey)}
                </p>
                {item.outcomes.length > 0 && (
                  <ul className="experience__entry__outcomes">
                    {item.outcomes.map((outcome) => (
                      <li key={outcome.labelKey} className="experience__entry__outcome">
                        <span className="experience__entry__outcome__figure">
                          {outcome.figure}
                        </span>
                        <span className="experience__entry__outcome__label">
                          {t(outcome.labelKey)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
