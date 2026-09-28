import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { cv } from "../../data/cv";
import type { YearMonth } from "../../types/cv.type";
import "./Education.scss";

function formatYearMonth(value: YearMonth): string {
  const [year, month] = value.split("-");
  return `${month}/${year}`;
}

/**
 * T5 — Education now shares the "Credentials" list language with
 * Certifications: a hairline rail with a square node per entry (the same
 * device as the Experience rail) and alternating indent on the entry body
 * from `$bp-sm` (Taste Skill 4.7's offset/staggered rhythm) instead of the
 * section's previous one-off 2px top rule. Education keeps its own larger,
 * "senior" `--fs-xl` issuer scale and status marker — only the rail/node/
 * stagger shell is shared, not the type scale.
 */
export default function Education() {
  const { t } = useTranslation();
  const listRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="section education" id="education">
      <div className="content">
        <h2 className="title">{t("education_title")}</h2>
        <div className="education__list reveal stagger-children" ref={listRef}>
          <span className="education__rail" aria-hidden="true" />
          {cv.education.map((item, index) => (
            <article
              key={item.nameKey}
              className="education__entry"
              style={{ "--i": index } as React.CSSProperties}
            >
              <span className="education__entry__node" aria-hidden="true" />
              <div className="education__entry__body">
                <h3 className="education__entry__issuer">{item.issuer}</h3>
                <p className="education__entry__name">{t(item.nameKey)}</p>
                <div className="education__entry__meta">
                  <span className="education__entry__status">{t(item.statusKey)}</span>
                  <span className="education__entry__date">{formatYearMonth(item.awarded)}</span>
                </div>
                {item.verifyUrl && (
                  <a
                    href={item.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="education__entry__verify"
                  >
                    {t("education_action_verify")}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <path d="M15 3h6v6" />
                      <path d="M10 14L21 3" />
                    </svg>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
