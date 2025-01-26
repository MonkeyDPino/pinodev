import { svgsConstants } from "../../constants/svgs";
import { svgs } from "../../types/svgs.type";
import "./Technologies.scss";

export default function Technologies() {
  const technologies: {
    name: string;
    nameColor?: string;
    technologies: {
      name: string;
      image: svgs;
    }[];
  }[] = [
    {
      name: "Frontend",
      nameColor: "#53f399",
      technologies: [
        {
          name: "HTML",
          image: "html",
        },
        {
          name: "CSS",
          image: "css",
        },
        {
          name: "JavaScript",
          image: "javascript",
        },
        {
          name: "TypeScript",
          image: "typescript",
        },
        {
          name: "React",
          image: "react",
        },
        {
          name: "Sass",
          image: "sass",
        },
        {
          name: "Tailwind",
          image: "tailwind",
        },
      ],
    },
    {
      name: "Backend",
      nameColor: "#ffc136",
      technologies: [
        {
          name: "Node.js",
          image: "nodejs",
        },
        {
          name: "Python",
          image: "python",
        },
        {
          name: "PostgreSQL",
          image: "postgresql",
        },
        {
          name: "MongoDB",
          image: "mongodb",
        },
        {
          name: "Express.js",
          image: "express",
        },
        {
          name: "Docker",
          image: "docker",
        },
      ],
    },
    {
      name: "Tools",
      nameColor: "#f5965a",
      technologies: [
        {
          name: "AWS",
          image: "aws",
        },
        {
          name: "Npm",
          image: "npm",
        },
        {
          name: "Postman",
          image: "postman",
        },
        {
          name: "Terminal",
          image: "terminal",
        },
        {
          name: "VScode",
          image: "vscode",
        },
      ],
    },
  ];
  return (
    <section className="section technologies" id="technologies">
      <div className="content">
        <div className="title">Technologies</div>
        <div className="technologies__content">
          <article className="technologies__content__list">
            {technologies.map((technology) => (
              <div key={technology.name} className="technology">
                <div
                  className="technology__name"
                  style={{
                    color: technology.nameColor,
                  }}
                >
                  {technology.name}
                </div>
                <div className="technology__list">
                  {technology.technologies.map((tech) => (
                    <div key={tech?.name} className="technology__item">
                      <img src={svgsConstants[tech?.image]} alt={tech?.image} />
                      <div>{tech?.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </article>
        </div>
      </div>
    </section>
  );
}
