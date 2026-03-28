import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./Experience.scss";

export default function Experience() {
  const { t } = useTranslation();
  const listRef = useScrollReveal<HTMLDivElement>();

  const events = [
    {
      role: t("experience_0_role"),
      company: "Agentemotor",
      date: "2022 - Present",
      description: t("experience_0_description"),
    },
    {
      role: t("experience_1_role"),
      company: "Universidad Tecnológica de Pereira",
      date: "2021 - 2022",
      description: t("experience_1_description"),
    },
  ];

  return (
    <section className="section experience" id="experience">
      <div className="content">
        <div className="title">{t("experience_title")}</div>
        <div
          className="experience__list reveal stagger-children"
          ref={listRef}
        >
          {events.map((item, index) => (
            <div
              key={index}
              className="experience__card"
              style={{ '--i': index } as React.CSSProperties}
            >
              <div className="experience__card__header">
                <div>
                  <span className="role">{item.role}</span>
                  <span className="company"> — {item.company}</span>
                </div>
                <span className="date">{item.date}</span>
              </div>
              <p className="description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
