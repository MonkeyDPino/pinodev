import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  m,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cv } from "../../data/cv";
import { svgsConstants } from "../../constants/svgs";
import { techLabels } from "../../constants/techLabels";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import type { svgs } from "../../types/svgs.type";
import "./Home.scss";

type SocialKind = (typeof cv.socials)[number]["kind"];

/**
 * Inline, theme-aware social glyphs. The source assets in `src/assets/`
 * bake in a fixed white fill, which is exactly why they read as
 * near-invisible in the light theme (PR2 browser verification) — inlined
 * here with `currentColor` instead, the same pattern already used for the
 * CV-download/menu icons in this component's own header sibling.
 */
function SocialIcon({ kind }: { kind: SocialKind }) {
  switch (kind) {
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            fill="currentColor"
            d="M4.0744 2.9938C4.13263 1.96371 4.37869 1.51577 5.08432 1.15606C5.84357 0.768899 7.04106 0.949072 8.45014 1.66261C9.05706 1.97009 9.11886 1.97635 10.1825 1.83998C11.5963 1.65865 13.4164 1.65929 14.7213 1.84164C15.7081 1.97954 15.7729 1.97265 16.3813 1.66453C18.3814 0.651679 19.9605 0.71795 20.5323 1.8387C20.8177 2.39812 20.8707 3.84971 20.6494 5.04695C20.5267 5.71069 20.5397 5.79356 20.8353 6.22912C22.915 9.29385 21.4165 14.2616 17.8528 16.1155C17.5801 16.2574 17.3503 16.3452 17.163 16.4167C16.5879 16.6363 16.4133 16.703 16.6247 17.7138C16.7265 18.2 16.8491 19.4088 16.8973 20.4002C16.9844 22.1922 16.9831 22.2047 16.6688 22.5703C16.241 23.0676 15.6244 23.076 15.2066 22.5902C14.9341 22.2734 14.9075 22.1238 14.9075 20.9015C14.9075 19.0952 14.7095 17.8946 14.2417 16.8658C13.6854 15.6415 14.0978 15.185 15.37 14.9114C17.1383 14.531 18.5194 13.4397 19.2892 11.8146C20.0211 10.2698 20.1314 8.13501 18.8082 6.83668C18.4319 6.3895 18.4057 5.98446 18.6744 4.76309C18.7748 4.3066 18.859 3.71768 18.8615 3.45425C18.8653 3.03823 18.8274 2.97541 18.5719 2.97541C18.4102 2.97541 17.7924 3.21062 17.1992 3.49805L16.2524 3.95695C16.1663 3.99866 16.07 4.0147 15.975 4.0038C13.5675 3.72746 11.2799 3.72319 8.86062 4.00488C8.76526 4.01598 8.66853 3.99994 8.58215 3.95802L7.63585 3.49882C7.04259 3.21087 6.42482 2.97541 6.26317 2.97541C5.88941 2.97541 5.88379 3.25135 6.22447 4.89078C6.43258 5.89203 6.57262 6.11513 5.97101 6.91572C5.06925 8.11576 4.844 9.60592 5.32757 11.1716C5.93704 13.1446 7.4295 14.4775 9.52773 14.9222C10.7926 15.1903 11.1232 15.5401 10.6402 16.9905C10.26 18.1319 10.0196 18.4261 9.46707 18.4261C8.72365 18.4261 8.25796 17.7821 8.51424 17.1082C8.62712 16.8112 8.59354 16.7795 7.89711 16.5255C5.77117 15.7504 4.14514 14.0131 3.40172 11.7223C2.82711 9.95184 3.07994 7.64739 4.00175 6.25453C4.31561 5.78028 4.32047 5.74006 4.174 4.83217C4.09113 4.31822 4.04631 3.49103 4.0744 2.9938Z"
          />
          <path
            fill="currentColor"
            d="M3.33203 15.9454C3.02568 15.4859 2.40481 15.3617 1.94528 15.6681C1.48576 15.9744 1.36158 16.5953 1.66793 17.0548C1.8941 17.3941 2.16467 17.6728 2.39444 17.9025C2.4368 17.9449 2.47796 17.9858 2.51815 18.0257C2.71062 18.2169 2.88056 18.3857 3.05124 18.5861C3.42875 19.0292 3.80536 19.626 4.0194 20.6962C4.11474 21.1729 4.45739 21.4297 4.64725 21.5419C4.85315 21.6635 5.07812 21.7352 5.26325 21.7819C5.64196 21.8774 6.10169 21.927 6.53799 21.9559C7.01695 21.9877 7.53592 21.998 7.99999 22.0008C8.00033 22.5527 8.44791 23.0001 8.99998 23.0001C9.55227 23.0001 9.99998 22.5524 9.99998 22.0001V21.0001C9.99998 20.4478 9.55227 20.0001 8.99998 20.0001C8.90571 20.0001 8.80372 20.0004 8.69569 20.0008C8.10883 20.0026 7.34388 20.0049 6.67018 19.9603C6.34531 19.9388 6.07825 19.9083 5.88241 19.871C5.58083 18.6871 5.09362 17.8994 4.57373 17.2891C4.34391 17.0194 4.10593 16.7834 3.91236 16.5914C3.87612 16.5555 3.84144 16.5211 3.80865 16.4883C3.5853 16.265 3.4392 16.1062 3.33203 15.9454Z"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            fill="currentColor"
            d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z"
          />
          <path
            fill="currentColor"
            d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z"
          />
          <path
            fill="currentColor"
            d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z"
          />
          <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
          />
          <path
            fill="currentColor"
            d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
          />
          <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
          />
        </svg>
      );
    default:
      return null;
  }
}

// Five core-stack marks for the Credentials face. All five already render
// correctly as a plain `<img>` in both themes (Technologies.tsx's own
// audit only flags a different subset — express/github/aws/linux/
// postgresql/nextjs/cicd and the AI-tooling marks — as needing the
// `currentColor` treatment); none of these five are in that list.
const CREDENTIAL_ICONS: readonly svgs[] = [
  "react",
  "typescript",
  "nodejs",
  "docker",
  "python",
];

// ============================================================
// Rotation keyframe table — see the T2 report for the derivation. The
// cube's outer transform is `rotateX(rx) rotateY(ry)`; each face is
// authored with a single local `rotateY`/`rotateX` + `translateZ`, and
// the rest value below is exactly the negative of that local rotation
// (mod 360, walked in one continuous direction so the tumble never
// snaps backwards): that is what makes every face land upright with
// zero net rotation at its own plateau, by construction rather than by
// per-face fudging.
//
//   progress   0     .13   .20   .30   .37   .47   .54   .64   .71   .79   .90   1.00
//   face       front front right right back  back  left  left  top   top   bottom bottom
//   rotateY    0     0     -90   -90   -180  -180  -270  -270  -360  -360  -360   -360
//   rotateX    0     0     0     0     0     0     0     0     -90   -90   90     90
//
// Paired values hold the face at rest (a flat plateau); the gap between
// pairs is the turn to the next face. The final turn (top -> bottom) is
// a 180 deg rotateX sweep at fixed rotateY, so it visibly passes back
// through the front face's own orientation at its midpoint — the "ring
// face" the task brief allows.
// ============================================================
const PROGRESS_STOPS = [
  0, 0.13, 0.2, 0.3, 0.37, 0.47, 0.54, 0.64, 0.71, 0.79, 0.9, 1,
];
const ROTATE_Y_STOPS = [
  0, 0, -90, -90, -180, -180, -270, -270, -360, -360, -360, -360,
];
const ROTATE_X_STOPS = [0, 0, 0, 0, 0, 0, 0, 0, -90, -90, 90, 90];

// Midpoints of each face's transition into the next — the thresholds
// that decide which face is "active" (and therefore focusable) at a
// given scroll progress.
const FACE_BOUNDARIES = [0.165, 0.335, 0.505, 0.675, 0.845];

// Centers of each face's own plateau — where its scroll-snap marker
// sits, expressed as a fraction of the track's scrollable distance
// (trackHeight 600svh - viewport 100svh = 500svh).
const SNAP_OFFSETS = [0.065, 0.25, 0.42, 0.59, 0.75, 0.95];
const FACE_IDS = ["front", "right", "back", "left", "top", "bottom"] as const;

function faceIndexForProgress(progress: number): number {
  for (let index = 0; index < FACE_BOUNDARIES.length; index += 1) {
    if (progress < FACE_BOUNDARIES[index]) return index;
  }
  return FACE_BOUNDARIES.length;
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/**
 * Front-face content, shared verbatim between the cube (where it sits on
 * `home__face--front`) and the flat fallback (where it is the page's
 * first section). `nameVariation` is only ever passed by the cube: the
 * pointer-driven Archivo axes are a cube-only flourish, gated at the
 * call site rather than here, so the flat hero never subscribes to a
 * pointer listener it has nowhere to attach anyway (task 5.D — no
 * continuous value ever needs a plain resting default in the flat
 * fallback). `revealRef` is only ever passed by the flat hero, whose
 * entrance reuses the same `reveal`/`stagger-children` mechanism as
 * every other section instead of a bespoke mount animation.
 */
function HeroIntro({
  nameVariation,
  revealRef,
}: {
  nameVariation?: MotionValue<string>;
  revealRef?: React.RefObject<HTMLDivElement>;
}) {
  const { t, i18n } = useTranslation();
  const cvUrl = cv.cvUrls[i18n.language as "en" | "es"] ?? cv.cvUrls.en;
  const animated = Boolean(revealRef);

  return (
    <div
      className={`home__intro${animated ? " reveal stagger-children" : ""}`}
      ref={revealRef}
    >
      {/* Top and footer clusters (rather than six flat siblings) so the
          cube face can anchor one to the top edge and one to the bottom
          edge (`justify-content: space-between` on `.home__face--front
          .home__intro`) instead of one centered clump leaving the lower
          half of the face empty. The flat hero just stacks the two
          clusters in normal flow — no visual change there. */}
      <div className="home__intro__top">
        <p className="home__greeting" style={{ "--i": 0 } as React.CSSProperties}>
          {t("home_greeting")}
        </p>

        <m.h1
          className="home__name"
          style={
            nameVariation ? { fontVariationSettings: nameVariation } : undefined
          }
        >
          {cv.nameLines.map((line) => (
            <span className="home__name-line" key={line}>
              {line}
            </span>
          ))}
        </m.h1>

        <p className="home__role" style={{ "--i": 1 } as React.CSSProperties}>
          {t("home_role")}
        </p>

        <p
          className="home__positioning"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          {t("home_positioning")}
        </p>
      </div>

      <div className="home__intro__footer" style={{ "--i": 3 } as React.CSSProperties}>
        <div className="home__actions">
          <div className="home__socials">
            {cv.socials.map((social) => (
              <a
                key={social.kind}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="home__social-link"
                aria-label={t(social.labelKey)}
              >
                <SocialIcon kind={social.kind} />
              </a>
            ))}
          </div>
          <a href={cvUrl} target="_blank" rel="noreferrer" className="home__cv-button">
            {t("home_cv_button")}
          </a>
        </div>

        <div className="home__portrait">
          <a href="#about_me">
            <span className="home__portrait-frame">
              <img
                src={cv.portrait}
                alt={cv.fullName}
                width={80}
                height={80}
                className="home__portrait-image"
              />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

function ExperiencePreview() {
  const { t } = useTranslation();
  const current = cv.experience[0];

  return (
    <div className="home__preview">
      <h3 className="home__preview__heading">
        {t(current.roleKey)} · {current.company}
      </h3>
      <p className="home__preview__line">{t("cube_experience_hook")}</p>
      <a className="home__preview__link" href="#experience">
        {t("nav_experience")}
      </a>
    </div>
  );
}

function ProjectsPreview() {
  const { t } = useTranslation();
  const project =
    cv.projects.find((item) => item.title === "Customer Insurance Portal") ??
    cv.projects[0];

  return (
    <div className="home__preview">
      <img
        className="home__preview__image"
        src={project.image}
        alt={t(project.descriptionKey)}
        width={480}
        height={300}
      />
      <h3 className="home__preview__heading">{project.title}</h3>
      <a className="home__preview__link" href="#projects">
        {t("nav_projects")}
      </a>
    </div>
  );
}

function AboutPreview() {
  const { t } = useTranslation();

  return (
    <div className="home__preview">
      <p className="home__preview__line">{t("cube_about_manifesto")}</p>
      <a className="home__preview__link" href="#about_me">
        {t("nav_about")}
      </a>
    </div>
  );
}

function CredentialsPreview() {
  const { t } = useTranslation();

  return (
    <div className="home__preview">
      <div className="home__preview__icons">
        {CREDENTIAL_ICONS.map((icon) => (
          <img
            key={icon}
            className="home__preview__icon"
            src={svgsConstants[icon]}
            alt={techLabels[icon]}
          />
        ))}
      </div>
      <a className="home__preview__link" href="#technologies">
        {t("technologies_title")}
      </a>
    </div>
  );
}

function ContactPreview() {
  const { t } = useTranslation();

  return (
    <div className="home__preview">
      <p className="home__preview__line">{t("contact_cta_sub")}</p>
      <a className="home__preview__link" href="#contact">
        {t("nav_contact")}
      </a>
    </div>
  );
}

/**
 * The scroll-driven 3D cube. Only ever mounted once `Home` has confirmed
 * full motion is both allowed (`prefers-reduced-motion: no-preference`)
 * and has the width to show a square this size (`$bp-md`) — see
 * `CUBE_MEDIA_QUERY` below.
 */
function CubeHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const faceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Kinetic name (task 6) — pointer position over the stage drives the
  // Archivo `wdth`/`wght` axes through a motion value -> spring chain,
  // written into one CSS custom property via `useMotionTemplate`. Never
  // `useState` for either continuous input. Rest state (mount, and after
  // the pointer leaves the stage) is the bold wide cut — the same
  // striking corner the static `.home__name` rule uses everywhere it
  // isn't kinetic — so the name never idles at a flat, unremarkable
  // mid-point; the pointer only ever pulls it away from that corner.
  const wdth = useMotionValue(112);
  const wght = useMotionValue(700);
  const wdthSpring = useSpring(wdth, { stiffness: 140, damping: 18, mass: 0.4 });
  const wghtSpring = useSpring(wght, { stiffness: 140, damping: 18, mass: 0.4 });
  const nameVariation = useMotionTemplate`"wdth" ${wdthSpring}, "wght" ${wghtSpring}`;

  // Scroll mapping (task 3) — raw progress across the tall track, smoothed
  // just enough to settle quickly without overshoot, then mapped through
  // the keyframe table above onto the two rotation axes and composed into
  // one `transform` string.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 34,
    mass: 1,
  });
  const rotateY = useTransform(smoothProgress, PROGRESS_STOPS, ROTATE_Y_STOPS);
  const rotateX = useTransform(smoothProgress, PROGRESS_STOPS, ROTATE_X_STOPS);
  const cubeTransform = useMotionTemplate`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  // Active face (task 5) — derived from the raw (unsmoothed) progress so
  // focus availability tracks true scroll position, and only written to
  // state when the discrete index actually changes.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = faceIndexForProgress(latest);
    setActiveIndex((previous) => (previous === index ? previous : index));
  });

  useEffect(() => {
    faceRefs.current.forEach((face, index) => {
      face?.toggleAttribute("inert", index !== activeIndex);
    });
  }, [activeIndex]);

  // Snap (task 4) — the root scroller only snaps while this component is
  // mounted, so the rest of the page keeps scrolling normally once the
  // cube track ends.
  useEffect(() => {
    document.documentElement.classList.add("has-cube-snap");
    return () => document.documentElement.classList.remove("has-cube-snap");
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = clamp01((event.clientX - rect.left) / rect.width);
    const relativeY = clamp01((event.clientY - rect.top) / rect.height);
    wdth.set(87 + relativeX * (112 - 87));
    wght.set(400 + relativeY * (700 - 400));
  }

  function handlePointerLeave() {
    wdth.set(112);
    wght.set(700);
  }

  function setFaceRef(index: number) {
    return (element: HTMLDivElement | null) => {
      faceRefs.current[index] = element;
    };
  }

  return (
    <div className="home__cube-track" ref={trackRef}>
      {SNAP_OFFSETS.map((offset, index) => (
        <span
          key={FACE_IDS[index]}
          className="home__cube-marker"
          style={{ top: `${offset * 500}svh` }}
        />
      ))}

      <div
        className="home__cube-stage"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <m.div className="home__cube" style={{ transform: cubeTransform }}>
          <div
            className="home__face home__face--front"
            ref={setFaceRef(0)}
            aria-hidden={activeIndex !== 0}
          >
            <HeroIntro nameVariation={nameVariation} />
          </div>
          <div
            className="home__face home__face--right"
            ref={setFaceRef(1)}
            aria-hidden={activeIndex !== 1}
          >
            <ExperiencePreview />
          </div>
          <div
            className="home__face home__face--back"
            ref={setFaceRef(2)}
            aria-hidden={activeIndex !== 2}
          >
            <ProjectsPreview />
          </div>
          <div
            className="home__face home__face--left"
            ref={setFaceRef(3)}
            aria-hidden={activeIndex !== 3}
          >
            <AboutPreview />
          </div>
          <div
            className="home__face home__face--top"
            ref={setFaceRef(4)}
            aria-hidden={activeIndex !== 4}
          >
            <CredentialsPreview />
          </div>
          <div
            className="home__face home__face--bottom"
            ref={setFaceRef(5)}
            aria-hidden={activeIndex !== 5}
          >
            <ContactPreview />
          </div>
        </m.div>
      </div>
    </div>
  );
}

/**
 * Reduced-motion / narrow-viewport fallback (task 7): the same front-face
 * content as a normal first section, plus the other five faces as a plain
 * card list underneath. No 3D, no tall track, normal document height.
 */
function FlatHero() {
  const introRef = useScrollReveal<HTMLDivElement>();
  const listRef = useScrollReveal<HTMLUListElement>();

  return (
    <div className="content">
      <HeroIntro revealRef={introRef} />
      <ul className="home__preview-list reveal stagger-children" ref={listRef}>
        <li className="home__preview-card" style={{ "--i": 0 } as React.CSSProperties}>
          <ExperiencePreview />
        </li>
        <li className="home__preview-card" style={{ "--i": 1 } as React.CSSProperties}>
          <ProjectsPreview />
        </li>
        <li className="home__preview-card" style={{ "--i": 2 } as React.CSSProperties}>
          <AboutPreview />
        </li>
        <li className="home__preview-card" style={{ "--i": 3 } as React.CSSProperties}>
          <CredentialsPreview />
        </li>
        <li className="home__preview-card" style={{ "--i": 4 } as React.CSSProperties}>
          <ContactPreview />
        </li>
      </ul>
    </div>
  );
}

// Mirrors `$bp-md` (variables.scss) — kept in JS as a media-query string
// since Sass variables don't exist at runtime.
const CUBE_MEDIA_QUERY =
  "(prefers-reduced-motion: no-preference) and (min-width: 48rem)";

export default function Home() {
  const cubeEnabled = useMediaQuery(CUBE_MEDIA_QUERY);

  return (
    <section
      className={`section home-section ${
        cubeEnabled ? "home-section--cube" : "home-section--flat"
      }`}
      id="home"
    >
      {cubeEnabled ? <CubeHero /> : <FlatHero />}
    </section>
  );
}
