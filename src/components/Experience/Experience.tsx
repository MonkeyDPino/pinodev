import { useEffect, useMemo, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { cv } from "../../data/cv";
import type { YearMonth } from "../../types/cv.type";
import "./Experience.scss";

function formatYearMonth(value: YearMonth): string {
  const [year, month] = value.split("-");
  return `${month}/${year}`;
}

interface ParsedFigure {
  readonly prefix: string;
  readonly suffix: string;
  readonly value: number;
  readonly decimals: number;
}

// Parses "~200", "~15%", "1" into a prefix/number/suffix triple so the
// count-up can animate the numeric part while preserving the exact
// display format. Returns null for a figure with no digits, which
// OutcomeMetric then renders as-is (no animation).
function parseFigure(figure: string): ParsedFigure | null {
  const match = /^(\D*)(\d+(?:\.\d+)?)(\D*)$/.exec(figure);
  if (!match) return null;
  const [, prefix, numeric, suffix] = match;
  const decimals = numeric.includes(".") ? numeric.split(".")[1].length : 0;
  return { prefix, suffix, decimals, value: Number(numeric) };
}

function formatFigure(value: number, parsed: ParsedFigure): string {
  const rounded =
    parsed.decimals > 0 ? value.toFixed(parsed.decimals) : String(Math.round(value));
  return `${parsed.prefix}${rounded}${parsed.suffix}`;
}

// The final value is always the text on first render (`{figure}` below) —
// motion never gates content. Only when reduced motion is off and the
// element has scrolled into view does the effect overwrite the node's
// `textContent` for one 0-to-value count-up, then hard-sets it back to
// the exact original string.
function OutcomeMetric({ figure }: { figure: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const parsed = useMemo(() => parseFigure(figure), [figure]);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!parsed || reduceMotion || !isInView) return;
    const node = ref.current;
    if (!node) return;

    const controls = animate(0, parsed.value, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent = formatFigure(latest, parsed);
      },
      onComplete: () => {
        node.textContent = figure;
      },
    });

    return () => controls.stop();
  }, [isInView, parsed, reduceMotion, figure]);

  return (
    <span className="experience__metric__figure" ref={ref}>
      {figure}
    </span>
  );
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
          <span className="experience__rail-track" aria-hidden="true" />
          {cv.experience.map((item, index) => (
            <article
              key={item.company}
              className="experience__entry"
              style={{ "--i": index } as React.CSSProperties}
            >
              <span className="experience__entry__node" aria-hidden="true" />

              <div className="experience__entry__meta">
                <span className="experience__entry__date">
                  {formatYearMonth(item.start)} -{" "}
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
                  <ul className="experience__metrics">
                    {item.outcomes.map((outcome) => (
                      <li key={outcome.labelKey} className="experience__metric">
                        <OutcomeMetric figure={outcome.figure} />
                        <span className="experience__metric__label">
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
