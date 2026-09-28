import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { techLabels } from "../../constants/techLabels";
import type { svgs } from "../../types/svgs.type";
import type { CvProject } from "../../types/cv.type";
import { cv } from "../../data/cv";
import { useState, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import "./Projects.scss";

type GalleryProject = Extract<CvProject, { kind: "gallery" }>;

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])';

// Bento roles (Taste Skill 4.7 cell-count rule: EXACTLY 6 cells for the 6
// `cv.ts` projects, no empty cells). This also fixes the render/tab order —
// it intentionally does not reuse `cv.projects`' own array order, so that
// order matches the grid's visual reading order (Projects.scss: 3 rows of
// 2, spans 7/5, 5/7, 6/6 — featured+secondary, config+comparator,
// giphy+blog) rather than the data file's order, keeping focus order
// aligned with the rendered layout (WCAG 2.4.3). Coupled to the exact
// project titles in `cv.ts` by design — this section is a curated
// 6-project bento, not a generic list renderer.
const BENTO_SLOTS: Readonly<
  Record<string, "featured" | "secondary" | "config" | "comparator" | "giphy" | "blog">
> = {
  "Customer Insurance Portal": "featured",
  "SOAT Quotation & Payment": "secondary",
  "Advisor Platform Config": "config",
  "Insurance Quote Comparator": "comparator",
  "Giphy Piece": "giphy",
  "Pino Blog": "blog",
};

// Cells whose slot uses the ramp gradient as a discrete tile surface
// instead of a full-bleed photo (Taste Skill 4.7: at most 2 per grid).
const SPOTLIGHT_SLOTS = new Set(["giphy", "blog"]);

const allProjects: readonly CvProject[] = cv.projects;
const bentoProjects: readonly CvProject[] = Object.keys(BENTO_SLOTS)
  .map((title) => allProjects.find((project) => project.title === title))
  .filter((project): project is CvProject => project !== undefined);

// A renamed, added or removed project would otherwise vanish from the
// grid without any error, so fail loudly in development instead.
if (import.meta.env.DEV && bentoProjects.length !== allProjects.length) {
  throw new Error(
    `Projects bento: BENTO_SLOTS covers ${bentoProjects.length} of ${allProjects.length} cv.ts projects; update the slot map.`,
  );
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

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
  const reduceMotion = useReducedMotion();
  const [activeModal, setActiveModal] = useState<GalleryProject | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const modalPanelRef = useRef<HTMLDivElement>(null);
  const modalTriggerRef = useRef<HTMLElement | null>(null);
  const modalLabelId = useId();

  const openModal = (project: GalleryProject, trigger: HTMLElement) => {
    modalTriggerRef.current = trigger;
    setActiveSlide(0);
    setActiveModal(project);
  };

  // Reset to slide 0 in the same tick the modal starts closing, so the
  // `layoutId` shared element always has a consistent state (matching the
  // grid cell it collapses back into) whichever slide the reader was on.
  const closeModal = () => {
    setActiveSlide(0);
    setActiveModal(null);
  };

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
        closeModal();
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

  const renderTechList = (technologies: readonly svgs[]) =>
    technologies.map((technology) => techLabels[technology]).join(" ");

  const fadeTransition = { duration: reduceMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] as const };
  const layoutTransition = { duration: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] as const };

  // A bento cell's inner content: the image frame first, at the image's
  // own native aspect ratio (Projects.scss sets it per slot) with
  // `object-fit: contain` so the whole mockup — including its own
  // gradient backdrop — is always visible, never cropped; the text body
  // (name, one/two-line description, mono stack tags, action) sits below
  // it, never overlaid, so it never fights the screenshot underneath.
  const renderBentoContent = (project: CvProject) => {
    const isGallery = project.kind === "gallery";
    const slug = slugify(project.title);

    return (
      <>
        <span className="bento__frame">
          {isGallery ? (
            <m.img
              layoutId={`project-image-${slug}`}
              src={project.image}
              alt={project.title}
              transition={layoutTransition}
            />
          ) : (
            <img src={project.image} alt={project.title} loading="lazy" />
          )}
        </span>
        <span className="bento__body">
          <h3 className="bento__title">{project.title}</h3>
          <p className="bento__description">{t(project.descriptionKey)}</p>
          <p className="bento__tech">{renderTechList(project.tech)}</p>
          <span className="bento__action">
            {project.kind === "link"
              ? t("projects_action_visit")
              : t("projects_action_gallery")}
            {project.kind === "link" ? <ExternalLinkIcon /> : <GalleryIcon />}
          </span>
        </span>
      </>
    );
  };

  return (
    <section className="section projects" id="projects">
      <div className="content">
        <h2 className="title">{t("projects_title")}</h2>

        <div className="bento reveal stagger-children" ref={rosterRef}>
          {bentoProjects.map((project, index) => {
            const slot = BENTO_SLOTS[project.title];
            const cellClass = `bento__cell bento__cell--${slot}${
              SPOTLIGHT_SLOTS.has(slot) ? " bento__cell--spotlight" : ""
            }`;
            const style = { "--i": index } as React.CSSProperties;

            return project.kind === "link" ? (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className={cellClass}
                style={style}
              >
                {renderBentoContent(project)}
              </a>
            ) : (
              <button
                key={project.title}
                type="button"
                className={cellClass}
                style={style}
                aria-haspopup="dialog"
                aria-label={t("projects_gallery_open", { title: project.title })}
                onClick={(event) => openModal(project, event.currentTarget)}
              >
                {renderBentoContent(project)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Image gallery modal — portaled to body to escape section stacking
          context. `AnimatePresence` needs a real, permanently-mounted
          element to track (a portal result is not one), so the portal
          call itself is unconditional and the `activeModal` check lives
          inside it, exactly as Motion's own guidance recommends. The
          cover image (slide 0) shares a `layoutId` with the bento cell
          that opened it, so it expands in place; everything else keeps
          the modal's prior behaviour untouched. */}
      {createPortal(
        <AnimatePresence>
          {activeModal && (
            <m.div
              key="project-modal"
              className="project-modal__overlay"
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={fadeTransition}
            >
              <m.div
                className="project-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby={modalLabelId}
                ref={modalPanelRef}
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={fadeTransition}
              >
                <button
                  className="project-modal__close"
                  onClick={closeModal}
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
                  {activeModal.images.map((src, i) =>
                    i === 0 ? (
                      <m.img
                        key={i}
                        layoutId={`project-image-${slugify(activeModal.title)}`}
                        src={src}
                        alt={`${activeModal.title} ${i + 1}`}
                        className={i === activeSlide ? "active" : ""}
                        transition={layoutTransition}
                      />
                    ) : (
                      <img
                        key={i}
                        src={src}
                        alt={`${activeModal.title} ${i + 1}`}
                        className={i === activeSlide ? "active" : ""}
                      />
                    ),
                  )}
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
              </m.div>
            </m.div>
          )}
        </AnimatePresence>,
        document.body,
        "project-modal",
      )}
    </section>
  );
}
