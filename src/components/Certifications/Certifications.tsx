import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { cv } from "../../data/cv";
import type { YearMonth } from "../../types/cv.type";
import "./Certifications.scss";

function formatYearMonth(value: YearMonth): string {
  const [year, month] = value.split("-");
  return `${month}/${year}`;
}

/**
 * T5 — replaces the previous de-facto 3-equal-card row
 * (`repeat(auto-fit, minmax(16rem,1fr))`, banned by Taste Skill 9.C) with
 * the same "Credentials" rail list Education now uses: a hairline rail,
 * a square node per entry, and alternating indent on the entry body from
 * `$bp-sm`.
 */
export default function Certifications() {
  const { t } = useTranslation();
  const listRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="section certifications" id="certifications">
      <div className="content">
        <h2 className="title">{t("certifications_title")}</h2>
        <div
          className="certifications__list reveal stagger-children"
          ref={listRef}
        >
          <span className="certifications__rail" aria-hidden="true" />
          {cv.certifications.map((cert, index) => (
            <article
              key={cert.nameKey}
              className="certifications__entry"
              style={{ "--i": index } as React.CSSProperties}
            >
              <span className="certifications__entry__node" aria-hidden="true" />
              <div className="certifications__entry__body">
                <h3 className="certifications__entry__issuer">{cert.issuer}</h3>
                <p className="certifications__entry__name">{t(cert.nameKey)}</p>
                <p className="certifications__entry__date">
                  {formatYearMonth(cert.awarded)}
                </p>
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="certifications__entry__verify"
                  >
                    {t("certifications_action_verify")}
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
