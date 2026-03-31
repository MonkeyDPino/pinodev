import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { svgsConstants } from "../../constants/svgs";
import { svgs } from "../../types/svgs.type";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./Projects.scss";

const techLogoMap: Record<string, svgs> = {
  React: "react",
  "Next.js": "nextjs",
  "Node.js": "nodejs",
  MongoDB: "mongodb",
  Vercel: "vercel",
  TypeScript: "typescript",
  JavaScript: "javascript",
  PostgreSQL: "postgresql",
  Docker: "docker",
  Python: "python",
  AWS: "aws",
  Tailwind: "tailwind",
  Express: "express",
  Vite: "vite",
  Postman: "postman",
};

type LinkProject = {
  type: "link";
  title: string;
  description: string;
  technologies: string[];
  thumbnail: string;
  link: string;
};

type GalleryProject = {
  type: "gallery";
  title: string;
  description: string;
  technologies: string[];
  images: string[];
};

type Project = LinkProject | GalleryProject;

export default function Projects() {
  const { t } = useTranslation();
  const carouselRef = useScrollReveal<HTMLDivElement>();
  const [activeModal, setActiveModal] = useState<GalleryProject | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentProject, setCurrentProject] = useState(0);
  const [slideClass, setSlideClass] = useState("slide-in-right");

  const projects: Project[] = [
    {
      type: "gallery",
      title: t("projects_1_title"),
      description: t("projects_1_description"),
      technologies: ["React", "Vite", "AWS", "PostgreSQL", "Python"],
      images: ["/images/p_comp_1.webp"],
    },
    {
      type: "gallery",
      title: t("projects_2_title"),
      description: t("projects_2_description"),
      technologies: ["React", "Vite", "AWS", "PostgreSQL", "Python"],
      images: [
        "/images/p_config_1.webp",
        "/images/p_config_2.webp",
        "/images/p_config_3.webp",
      ],
    },
    {
      type: "gallery",
      title: t("projects_3_title"),
      description: t("projects_3_description"),
      technologies: ["Next.js", "React", "AWS", "Python", "PostgreSQL"],
      images: [
        "/images/p_portal_1.webp",
        "/images/p_portal_2.webp",
        "/images/p_portal_3.webp",
        "/images/p_portal_4.webp",
        "/images/p_portal_5.webp",
        "/images/p_portal_6.webp",
      ],
    },
    {
      type: "gallery",
      title: t("projects_4_title"),
      description: t("projects_4_description"),
      technologies: ["React", "Vite", "AWS", "PostgreSQL", "Python", "Postman"],
      images: [
        "/images/p_soat_1.webp",
        "/images/p_soat_2.webp",
        "/images/p_soat_3.webp",
        "/images/p_soat_4.webp",
      ],
    },
    {
      type: "link",
      title: "Giphy Piece",
      description: t("projects_0_description"),
      technologies: ["React", "Node.js", "MongoDB", "Vercel"],
      thumbnail: "/images/giphy-app.webp",
      link: "https://giphy.pinodev.app",
    },
  ];

  // Image carousel auto-advance
  useEffect(() => {
    if (!activeModal || activeModal.images.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % activeModal.images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [activeModal]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModal]);

  // ESC to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveModal(null);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const openModal = (project: GalleryProject) => {
    setActiveSlide(0);
    setActiveModal(project);
  };

  const navigateProject = (dir: "prev" | "next") => {
    setSlideClass(dir === "next" ? "slide-in-right" : "slide-in-left");
    setCurrentProject((prev) =>
      dir === "next"
        ? (prev + 1) % projects.length
        : (prev - 1 + projects.length) % projects.length,
    );
  };

  const goToProject = (index: number) => {
    setSlideClass(index > currentProject ? "slide-in-right" : "slide-in-left");
    setCurrentProject(index);
  };

  const getThumbnail = (project: Project) =>
    project.type === "link" ? project.thumbnail : project.images[0];

  const renderTechBadges = (technologies: string[]) =>
    technologies.map((technology, i) => (
      <span key={i} className="technology">
        {techLogoMap[technology] && (
          <img
            src={svgsConstants[techLogoMap[technology]]}
            alt={technology}
            className="technology__logo"
          />
        )}
        {technology}
      </span>
    ));

  const renderCard = (project: Project) => (
    <article className="project_card">
      <div className="project__thumbnail">
        <img src={getThumbnail(project)} alt={project.title} />
        {project.type === "gallery" && (
          <div className="project__thumbnail__overlay">
            <span className="project__gallery-badge">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              Gallery
            </span>
          </div>
        )}
      </div>
      <div className="project__info">
        <div className="project__info__title">{project.title}</div>
        <div className="project__info__description">{project.description}</div>
        <div className="project__info__technologies">
          {renderTechBadges(project.technologies)}
        </div>
      </div>
    </article>
  );

  const project = projects[currentProject];

  return (
    <section className="section projects" id="projects">
      <div className="content">
        <div className="title">{t("projects_title")}</div>

        <div className="projects__carousel reveal" ref={carouselRef}>
          <div className="projects__carousel__track">
            <div
              key={currentProject}
              className={`projects__carousel__slide ${slideClass}`}
            >
              {project.type === "link" ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="project_link"
                >
                  {renderCard(project)}
                </a>
              ) : (
                <div
                  className="project_link project_link--gallery"
                  onClick={() => openModal(project)}
                >
                  {renderCard(project)}
                </div>
              )}
            </div>
          </div>

          <div className="projects__carousel__nav">
            <button
              className="projects__carousel__arrow"
              onClick={() => navigateProject("prev")}
              aria-label="Previous project"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="projects__carousel__dots">
              {projects.map((_, i) => (
                <button
                  key={i}
                  className={`projects__carousel__dot${i === currentProject ? " active" : ""}`}
                  onClick={() => goToProject(i)}
                  aria-label={`Project ${i + 1}`}
                />
              ))}
            </div>

            <button
              className="projects__carousel__arrow"
              onClick={() => navigateProject("next")}
              aria-label="Next project"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Image gallery modal — portaled to body to escape section stacking context */}
      {activeModal &&
        createPortal(
          <div
            className="project-modal__overlay"
            onClick={() => setActiveModal(null)}
          >
            <div className="project-modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="project-modal__close"
                onClick={() => setActiveModal(null)}
                aria-label="Close"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="project-modal__carousel">
                {activeModal.images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${activeModal.title} ${i + 1}`}
                    className={i === activeSlide ? "active" : ""}
                  />
                ))}
                {activeModal.images.length > 1 && (
                  <>
                    <button
                      className="project-modal__arrow project-modal__arrow--prev"
                      onClick={() =>
                        setActiveSlide(
                          (activeSlide - 1 + activeModal.images.length) %
                            activeModal.images.length,
                        )
                      }
                      aria-label="Previous"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button
                      className="project-modal__arrow project-modal__arrow--next"
                      onClick={() =>
                        setActiveSlide(
                          (activeSlide + 1) % activeModal.images.length,
                        )
                      }
                      aria-label="Next"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                    <div className="project-modal__dots">
                      {activeModal.images.map((_, i) => (
                        <button
                          key={i}
                          className={`project-modal__dot${i === activeSlide ? " active" : ""}`}
                          onClick={() => setActiveSlide(i)}
                          aria-label={`Slide ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="project-modal__info">
                <div className="project-modal__title">{activeModal.title}</div>
                <div className="project-modal__description">
                  {activeModal.description}
                </div>
                <div className="project-modal__technologies">
                  {renderTechBadges(activeModal.technologies)}
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
