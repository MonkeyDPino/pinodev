import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { svgsConstants } from "../../constants/svgs";
import { techLabels } from "../../constants/techLabels";
import { svgs } from "../../types/svgs.type";
import type { CvProject } from "../../types/cv.type";
import { cv } from "../../data/cv";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./Projects.scss";

type GalleryProject = Extract<CvProject, { kind: "gallery" }>;

export default function Projects() {
  const { t } = useTranslation();
  const carouselRef = useScrollReveal<HTMLDivElement>();
  const [activeModal, setActiveModal] = useState<GalleryProject | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentProject, setCurrentProject] = useState(0);
  const [slideClass, setSlideClass] = useState("slide-in-right");

  const projects = cv.projects;

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

  const renderTechBadges = (technologies: readonly svgs[]) =>
    technologies.map((technology) => (
      <span key={technology} className="technology">
        <img
          src={svgsConstants[technology]}
          alt={techLabels[technology]}
          className="technology__logo"
        />
        {techLabels[technology]}
      </span>
    ));

  const renderCard = (project: CvProject) => (
    <article className="project_card">
      <div className="project__thumbnail">
        <img src={project.image} alt={project.title} />
        {project.kind === "gallery" && (
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
        <div className="project__info__description">{t(project.descriptionKey)}</div>
        <div className="project__info__technologies">
          {renderTechBadges(project.tech)}
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
              {project.kind === "link" ? (
                <a
                  href={project.url}
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
                  {t(activeModal.descriptionKey)}
                </div>
                <div className="project-modal__technologies">
                  {renderTechBadges(activeModal.tech)}
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
