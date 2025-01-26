import { Timeline } from "primereact/timeline";
import "./Experience.scss";

export default function Experience() {
  const events = [
    {
      icon: "pi pi-calendar",
      role: "Full-stack Developer",
      company: "Agentemotor",
      date: "2022 - Present",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt, ...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt, ...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt, ...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt, ...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt, ...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt, ...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt, ...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt, ...",
    },
    {
      icon: "pi pi-calendar",
      role: "Full Stack Developer",
      company: "Company A",
      date: "2019 - Present",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt, ...",
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
        <div className="title">Experience</div>
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
