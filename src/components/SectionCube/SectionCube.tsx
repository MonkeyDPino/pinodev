import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { m } from "motion/react";
import {
  Briefcase,
  Certificate,
  Cpu,
  EnvelopeSimple,
  FolderOpen,
  GraduationCap,
  House,
  UserCircle,
  type Icon,
} from "@phosphor-icons/react";
import { cv } from "../../data/cv";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import type { I18nKey } from "../../types/cv.type";
import "./SectionCube.scss";

// Mirrors `$bp-lg` (variables.scss, 64rem/1024px) — kept in JS as a
// media-query string since Sass variables don't exist at runtime (same
// pattern the previous cube used for its own breakpoint gate). Only the
// `"side"` variant self-gates on it: the `"compact"` variant is mounted
// or not by its caller (`Header`), which already decides from the
// complementary `!isDesktop` check.
export const DESKTOP_MEDIA_QUERY = "(min-width: 64rem)";

// One weight used consistently across every face (design-taste-frontend
// 3.C — one icon family, one weight for the whole tree).
const ICON_WEIGHT = "regular";

const FACE_COUNT = 4;

interface CubeSection {
  readonly id: string;
  readonly titleKey: I18nKey;
  readonly factKey: I18nKey;
  readonly factValues?: Record<string, string | number>;
  readonly Icon: Icon;
}

const currentExperience = cv.experience[0];
const currentExperienceYear = currentExperience.start.slice(0, 4);
const educationYear = cv.education[0].awarded.slice(0, 4);

// All 8 sections in DOM/anchor order. Facts are derived from `cv.ts`
// (counts, years, the current company) rather than invented — see the
// task report for the exact strings chosen.
const SECTIONS: readonly CubeSection[] = [
  {
    id: "home",
    titleKey: "nav_home",
    factKey: "cube_fact_home",
    factValues: { location: cv.location },
    Icon: House,
  },
  {
    id: "experience",
    titleKey: "experience_title",
    factKey: "cube_fact_experience",
    factValues: { company: currentExperience.company, year: currentExperienceYear },
    Icon: Briefcase,
  },
  {
    id: "projects",
    titleKey: "projects_title",
    factKey: "cube_fact_projects",
    factValues: { count: cv.projects.length },
    Icon: FolderOpen,
  },
  {
    id: "about_me",
    titleKey: "about_title",
    factKey: "cube_fact_about",
    Icon: UserCircle,
  },
  {
    id: "contact",
    titleKey: "contact_title",
    factKey: "cube_fact_contact",
    Icon: EnvelopeSimple,
  },
  {
    id: "education",
    titleKey: "education_title",
    factKey: "cube_fact_education",
    factValues: { year: educationYear },
    Icon: GraduationCap,
  },
  {
    id: "certifications",
    titleKey: "certifications_title",
    factKey: "cube_fact_certifications",
    factValues: { count: cv.certifications.length },
    Icon: Certificate,
  },
  {
    id: "technologies",
    titleKey: "technologies_title",
    factKey: "cube_fact_technologies",
    factValues: { count: cv.coreSkills.length },
    Icon: Cpu,
  },
];

const SECTION_IDS = SECTIONS.map((section) => section.id);

function slotFor(sectionIndex: number): number {
  return ((sectionIndex % FACE_COUNT) + FACE_COUNT) % FACE_COUNT;
}

/** The 4 section indices (may include out-of-range ones at either end
 * of the list) whose content the physical faces must carry once
 * `activeIndex` lands on `active` — see the task report for the
 * derivation of why this always assigns 4 distinct sections to the 4
 * distinct slots. */
function assignSlots(active: number, previous: readonly (number | null)[]) {
  const next = previous.slice();
  for (const offset of [-1, 0, 1, 2]) {
    const index = active + offset;
    if (index >= 0 && index < SECTIONS.length) {
      next[slotFor(index)] = index;
    }
  }
  return next;
}

export type SectionCubeVariant = "side" | "compact";

interface SectionCubeProps {
  /** `"side"` (default) — the sticky left-column indicator from `$bp-lg`,
   * full face content (icon, title, fact), self-gated on its own
   * breakpoint check. `"compact"` — the small header mirror below
   * `$bp-lg`, icon only, mounted/unmounted by its caller. */
  variant?: SectionCubeVariant;
}

/**
 * The decorative section indicator: a mirror of whichever section is
 * currently being read. Purely cosmetic — the header nav (desktop) and
 * the anchor links (mobile overlay) stay the actual navigation. Never
 * focusable, always `aria-hidden`.
 */
export default function SectionCube({ variant = "side" }: SectionCubeProps) {
  const { t } = useTranslation();
  const isSide = variant === "side";
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const activeIndex = useActiveSection(SECTION_IDS, isSide ? isDesktop : true);
  const [slotSections, setSlotSections] = useState<readonly (number | null)[]>(
    () => assignSlots(0, [null, null, null, null]),
  );

  useEffect(() => {
    setSlotSections((previous) => assignSlots(activeIndex, previous));
  }, [activeIndex]);

  if (isSide && !isDesktop) return null;

  return (
    <div className={`section-cube section-cube--${variant}`} aria-hidden="true">
      <div className="section-cube__stage">
        {/* Permanent resting 3D pose — a static top-down pitch on this
            wrapper, never animated, so the ring reads as a cube (lid
            visible) at rest instead of a flat card. No yaw: the active
            face stays square-on horizontally and no neighbour face is
            visible at rest, only during the turn. The spring below only
            ever animates the ring's own `rotateY`, composed on top of
            this fixed pitch. */}
        <div className="section-cube__tilt">
          <m.div
            className="section-cube__cube"
            animate={{ rotateY: -90 * activeIndex }}
            transition={{ type: "spring", bounce: 0.15, visualDuration: 0.6 }}
          >
            {/* Decorative top/bottom caps — part of the ring, so they turn
                with it, but rotationally invariant around Y (a square
                centred on that axis), so they never need slot content. */}
            <div className="section-cube__cap section-cube__cap--top" />
            <div className="section-cube__cap section-cube__cap--bottom" />

            {slotSections.map((sectionIndex, slot) => {
              if (sectionIndex === null) return null;
              const section = SECTIONS[sectionIndex];
              const SectionIcon = section.Icon;
              return (
                <div key={slot} className={`section-cube__face section-cube__face--${slot}`}>
                  <SectionIcon
                    className="section-cube__icon"
                    weight={ICON_WEIGHT}
                    aria-hidden="true"
                  />
                  {isSide && (
                    <>
                      <p className="section-cube__title">{t(section.titleKey)}</p>
                      <p className="section-cube__fact">
                        {t(section.factKey, section.factValues)}
                      </p>
                    </>
                  )}
                </div>
              );
            })}
          </m.div>
        </div>
      </div>
    </div>
  );
}
