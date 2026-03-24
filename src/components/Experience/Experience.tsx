import { useTranslation } from "react-i18next";
import { Timeline } from "primereact/timeline";
import "./Experience.scss";

export default function Experience() {
  const { t } = useTranslation();

  const events = [
    {
      icon: "pi pi-calendar",
      role: t("experience_0_role"),
      company: "Agentemotor",
      date: "2022 - Present",
      description: t("experience_0_description"),
    },
    {
      icon: "pi pi-calendar",
      role: t("experience_1_role"),
      company: "Universidad Tecnológica de Pereira",
      date: "2021 - 2022",
      description: t("experience_1_description"),
    },
  ];

  const customizedMarker = (item: {
    status: string;
    date: string;
    icon: string;
    color: string;
  }) => {
    return (
      <span className="marker">
        <i className={item.icon}></i>
      </span>
    );
  };

  return (
    <section className="section experience" id="experience">
      <div className="content">
        <div className="title">{t("experience_title")}</div>
        <div className="experience__content">
          <Timeline
            value={events}
            marker={customizedMarker}
            opposite={() => <></>}
            content={(item) => (
              <div className="experience__item">
                <div className="experience__item__header">
                  <span className="role">{item.role}</span>
                  <span className="company"> - {item.company}</span>
                </div>
                <div className="experience__item__date">
                  <time>{item.date}</time>
                </div>
                <div className="experience__item__description">
                  {item.description}
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}
