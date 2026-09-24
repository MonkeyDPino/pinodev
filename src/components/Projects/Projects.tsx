import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { techLabels } from "../../constants/techLabels";
import type { svgs } from "../../types/svgs.type";
import type { CvProject } from "../../types/cv.type";
import { cv } from "../../data/cv";
import { useState, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import "./Projects.scss";

type GalleryProject = Extract<CvProject, { kind: "gallery" }>;

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])';

function ExternalLinkIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GalleryIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

export default function Projects() {
  const { t } = useTranslation();
  const rosterRef = useScrollReveal<HTMLDivElement>();
  const [activeModal, setActiveModal] = useState<GalleryProject | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const modalPanelRef = useRef<HTMLDivElement>(null);
  const modalTriggerRef = useRef<HTMLElement | null>(null);
  const modalLabelId = useId();

  const projects = cv.projects;

  // Body scroll lock while the gallery modal is open.
  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModal]);

  // Approved JS exception 5/5 (design #1868/#1872, task 4.8) — the
  // gallery modal's own focus trap, the same pattern PR3 established for
  // the mobile nav overlay (Header.tsx). On open: focus moves into the
  // panel. While open: Tab/Shift+Tab never leave it, Escape closes it.
  // On close: focus returns to the trigger button that opened it, using
  // a value captured into a local variable rather than read from the
  // ref during cleanup (the same fix that satisfied
  // `react-hooks/exhaustive-deps` in the header's own trap).
  useEffect(() => {
    if (!activeModal) return;
    const panel = modalPanelRef.current;
    if (!panel) return;

    const getFocusable = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));

    const focusables = getFocusable();
    (focusables[0] ?? panel).focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setActiveModal(null);
        return;
      }
      if (event.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const trigger = modalTriggerRef.current;
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [activeModal]);

  const openModal = (project: GalleryProject, trigger: HTMLElement) => {
    modalTriggerRef.current = trigger;
    setActiveSlide(0);
    setActiveModal(project);
  };

  const renderTechList = (technologies: readonly svgs[]) =>
    technologies.map((technology) => techLabels[technology]).join(" ");

  // The Roster (D4 revised) — a compact index-style card: thumbnail,
  // title, a 2-line-clamped description, a wrapped tech line, action
  // link. Distinguished from Certifications' Index by the thumbnail,
  // the absence of any cell-dividing border, and the Plate's own hover
  // signature (image scale + growing title underline) — see
  // Projects.scss for the full rationale.
  const renderCard = (project: CvProject) => (
    <article className="roster__card">
      <div className="roster__frame">
        <img src={project.image} alt={project.title} loading="lazy" />
      </div>
      <div className="roster__body">
        <h3 className="roster__title">{project.title}</h3>
        <p className="roster__description">{t(project.descriptionKey)}</p>
        <p className="roster__tech">{renderTechList(project.tech)}</p>
        <span className="roster__action">
          {project.kind === "link"
            ? t("projects_action_visit")
            : t("projects_action_gallery")}
          {project.kind === "link" ? <ExternalLinkIcon /> : <GalleryIcon />}
        </span>
      </div>
    </article>
  );

  return (
    <section className="section projects" id="projects">
      <div className="content">
        <h2 className="title">{t("projects_title")}</h2>

        <div className="roster reveal stagger-children" ref={rosterRef}>
          {projects.map((project, index) =>
            project.kind === "link" ? (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="roster__trigger"
                style={{ "--i": index } as React.CSSProperties}
              >
                {renderCard(project)}
              </a>
            ) : (
              <button
                key={project.title}
                type="button"
                className="roster__trigger"
                style={{ "--i": index } as React.CSSProperties}
                aria-haspopup="dialog"
                aria-label={t("projects_gallery_open", { title: project.title })}
                onClick={(event) => openModal(project, event.currentTarget)}
              >
                {renderCard(project)}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Image gallery modal — portaled to body to escape section stacking context */}
      {activeModal &&
        createPortal(
          <div
            className="project-modal__overlay"
            onClick={() => setActiveModal(null)}
          >
            <div
              className="project-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby={modalLabelId}
              ref={modalPanelRef}
              tabIndex={-1}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="project-modal__close"
                onClick={() => setActiveModal(null)}
                aria-label={t("projects_modal_close")}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
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
                      aria-label={t("projects_modal_prev")}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button
                      className="project-modal__arrow project-modal__arrow--next"
                      onClick={() =>
                        setActiveSlide((activeSlide + 1) % activeModal.images.length)
                      }
                      aria-label={t("projects_modal_next")}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
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
                          aria-label={t("projects_modal_goto", { index: i + 1 })}
                          aria-current={i === activeSlide ? "true" : undefined}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="project-modal__info">
                <h3 id={modalLabelId} className="project-modal__title">
                  {activeModal.title}
                </h3>
                <p className="project-modal__description">
                  {t(activeModal.descriptionKey)}
                </p>
                <p className="project-modal__technologies">
                  {renderTechList(activeModal.tech)}
                </p>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
