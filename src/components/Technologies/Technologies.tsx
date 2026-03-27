import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { svgsConstants } from "../../constants/svgs";
import { svgs } from "../../types/svgs.type";
import "./Technologies.scss";

function TechCategory({ name, nameColor, technologies }: {
  name: string;
  nameColor?: string;
  technologies: { name: string; image: svgs }[];
}) {
  const { t } = useTranslation();
  const listRef = useScrollReveal<HTMLDivElement>();

  return (
    <div className="technology">
      <div className="technology__name" style={{ color: nameColor }}>
        {t(`technologies_category_${name}`)}
      </div>
      <div
        className="technology__list reveal stagger-children"
        ref={listRef}
      >
        {technologies.map((tech, i) => (
          <div
            key={tech.name}
            className="technology__item"
            style={{ '--i': i } as React.CSSProperties}
          >
            <img src={svgsConstants[tech.image]} alt={tech.name} />
            <div>{tech.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Technologies() {
  const { t } = useTranslation();

  const technologies: {
    name: string;
    nameColor?: string;
    technologies: { name: string; image: svgs }[];
  }[] = [
    {
      name: "frontend",
      nameColor: "#53f399",
      technologies: [
        { name: "HTML", image: "html" },
        { name: "CSS", image: "css" },
        { name: "JavaScript", image: "javascript" },
        { name: "TypeScript", image: "typescript" },
        { name: "React", image: "react" },
        { name: "Sass", image: "sass" },
        { name: "Tailwind", image: "tailwind" },
      ],
    },
    {
      name: "backend",
      nameColor: "#ffc136",
      technologies: [
        { name: "Node.js", image: "nodejs" },
        { name: "Python", image: "python" },
        { name: "PostgreSQL", image: "postgresql" },
        { name: "MongoDB", image: "mongodb" },
        { name: "Express.js", image: "express" },
        { name: "Docker", image: "docker" },
      ],
    },
    {
      name: "tools",
      nameColor: "#f5965a",
      technologies: [
        { name: "AWS", image: "aws" },
        { name: "Npm", image: "npm" },
        { name: "Postman", image: "postman" },
        { name: "Terminal", image: "terminal" },
        { name: "VScode", image: "vscode" },
      ],
    },
  ];

  return (
    <section className="section technologies" id="technologies">
      <div className="content">
        <div className="title">{t("technologies_title")}</div>
        <div className="technologies__content">
          <article className="technologies__content__list">
            {technologies.map((tech) => (
              <TechCategory key={tech.name} {...tech} />
            ))}
          </article>
        </div>
      </div>
    </section>
  );
}
