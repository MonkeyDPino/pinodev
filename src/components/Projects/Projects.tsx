import "./Projects.scss";

export default function Projects() {
  const projects = [
    {
      title: "Giphy Piece",
      description:
        "A web application that allows users to search for GIFs using the Giphy API.",
      technologies: ["React", "Node.js", "MongoDB", "Vercel"],
      thumbnail: "/images/giphy-app.webp",
      link: "https://giphy-pino.vercel.app",
    },
  ];

  return (
    <section className="section projects" id="projects">
      <div className="content">
        <div className="title">Projects</div>
        <div className="projects__content">
          {projects.map((project, index) => (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="project_link"
            >
              <article className="project_card" key={index}>
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
