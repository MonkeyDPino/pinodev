import "./Projects.scss";

export default function Projects() {
  const projects = [
    {
      title: "Project A",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt, ...",
      technologies: ["React", "Node.js", "MongoDB"],
      thumbnail: "https://cristianorrego.dev/images/colraices/cover.webp",
    },
    {
      title: "Project A",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt, ...",
      technologies: ["React", "Node.js", "MongoDB"],
      thumbnail: "https://cristianorrego.dev/images/colraices/cover.webp",
    },
    {
      title: "Project A",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt, ...",
      technologies: ["React", "Node.js", "MongoDB"],
      thumbnail: "https://cristianorrego.dev/images/colraices/cover.webp",
    },
    {
      title: "Project A",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt, ...",
      technologies: ["React", "Node.js", "MongoDB"],
      thumbnail: "https://cristianorrego.dev/images/colraices/cover.webp",
    },
    {
      title: "Project A",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt, ...",
      technologies: ["React", "Node.js", "MongoDB"],
      thumbnail: "https://cristianorrego.dev/images/colraices/cover.webp",
    },
  ];

  return (
    <section className="section projects" id="projects">
      <div className="content">
        <div className="title">Projects</div>
        <div className="projects__content">
          {projects.map((project, index) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
