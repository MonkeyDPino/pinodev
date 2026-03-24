import { useTranslation } from "react-i18next";
import "./Projects.scss";

export default function Projects() {
  const { t } = useTranslation();

  const projects = [
    {
      title: "Giphy Piece",
      description: t("projects_0_description"),
      technologies: ["React", "Node.js", "MongoDB", "Vercel"],
      thumbnail: "/images/giphy-app.webp",
      link: "https://giphy-pino.vercel.app",
    },
  ];

  return (
    <section className="section projects" id="projects">
      <div className="content">
        <div className="title">{t("projects_title")}</div>
        <div className="projects__content">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="project_link"
            >
              <article className="project_card">
                <div className="project__thumbnail">
                  <img src={project.thumbnail} alt={project.title} />
                </div>
                <div className="project__info">
                  <div className="project__info__title">{project.title}</div>
                  <div className="project__info__description">
                    {project.description}
                  </div>
                  <div className="project__info__technologies">
                    {project.technologies.map((technology, index) => (
                      <span key={index} className="technology">
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
