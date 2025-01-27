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
        "I work as a full-stack developer, focusing on the implementation and support of a platform designed to assist insurance intermediaries. This role has allowed me to refine my expertise in web application development and agile methodology implementation. I leverage technologies such as React, Node.js, Express, MongoDB, PostgreSQL, Docker, AWS, and more.",
    },
    {
      icon: "pi pi-calendar",
      role: "Investigation Assistant",
      company: "Universidad Tecnológica de Pereira",
      date: "2021 - 2022",
      description: `Contributed to a research group in the development of a scholarly article on quantum computing, enhancing research methodologies and technical writing skills through the proficient use of LaTeX.`,
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
