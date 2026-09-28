import { useMemo, useRef } from "react";
import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useTranslation } from "react-i18next";
import "./AboutMe.scss";

// T5 — About: the manifesto. Words brighten across the section's own scroll
// range instead of the section fading in as one block (motivated: this is
// the site's one prose-heavy section, and a word-by-word brighten rewards a
// slower read without hiding any content — the CLAUDE.md "recruiters scan
// fast" note is why the reveal offset below completes early, well before the
// paragraph would otherwise scroll out of view).
const MANIFESTO_DIM_OPACITY = 0.28;
// Each word's own brighten transition spans this many word-slots of scroll
// progress so neighbouring words overlap into a soft wave instead of every
// word snapping in individually.
const WORD_FADE_SPAN = 3;
interface ManifestoSegment {
  readonly text: string;
  readonly strong?: boolean;
}

interface ManifestoWord {
  readonly text: string;
  readonly strong: boolean;
}

// Concatenates the segments first (so punctuation/spacing between a plain
// run and a bold run stays exactly as authored) and only then splits the
// combined sentence into words, tagging each by whether its start index
// falls inside a bold segment's range.
function segmentsToWords(segments: readonly ManifestoSegment[]): ManifestoWord[] {
  let combined = "";
  const boldRanges: Array<readonly [number, number]> = [];
  for (const segment of segments) {
    const start = combined.length;
    combined += segment.text;
    if (segment.strong) boldRanges.push([start, start + segment.text.length]);
  }

  const words: ManifestoWord[] = [];
  const wordPattern = /\S+/g;
  let match: RegExpExecArray | null;
  while ((match = wordPattern.exec(combined))) {
    const wordStart = match.index;
    const strong = boldRanges.some(([from, to]) => wordStart >= from && wordStart < to);
    words.push({ text: match[0], strong });
  }
  return words;
}

function ManifestoWordSpan({
  word,
  index,
  total,
  progress,
  motionAllowed,
}: {
  word: ManifestoWord;
  index: number;
  total: number;
  progress: MotionValue<number>;
  motionAllowed: boolean;
}) {
  const step = 1 / total;
  const start = index * step;
  const end = Math.min(1, start + step * WORD_FADE_SPAN);
  // Always called (hook order must stay stable) — only wired into `style`
  // when motion is allowed, so reduced motion / pre-hydration renders every
  // word at the CSS base opacity of 1 (A4: motion never gates content).
  const opacity = useTransform(progress, [start, end], [MANIFESTO_DIM_OPACITY, 1]);

  return (
    <m.span
      className="about_me__word"
      style={motionAllowed ? { opacity } : undefined}
    >
      {word.strong ? <strong>{word.text}</strong> : word.text}{" "}
    </m.span>
  );
}

function ManifestoParagraph({
  segments,
  offset,
  total,
  progress,
  motionAllowed,
}: {
  segments: readonly ManifestoSegment[];
  offset: number;
  total: number;
  progress: MotionValue<number>;
  motionAllowed: boolean;
}) {
  const words = useMemo(() => segmentsToWords(segments), [segments]);
  const fullText = useMemo(() => segments.map((s) => s.text).join(""), [segments]);

  return (
    <p className="about_me__manifesto">
      {/* Screen readers get the plain sentence; the word-split copy below is
          purely visual and hidden from the accessibility tree. */}
      <span className="visually-hidden">{fullText}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <ManifestoWordSpan
            key={i}
            word={word}
            index={offset + i}
            total={total}
            progress={progress}
            motionAllowed={motionAllowed}
          />
        ))}
      </span>
    </p>
  );
}

export default function AboutMe() {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);
  // `useReducedMotion()` returns `null` until the media query resolves; only
  // an explicit `false` (motion confirmed allowed) turns the reveal on, so
  // the base render is always the fully-bright, readable state.
  const motionAllowed = useReducedMotion() === false;

  // Targets the prose block itself (not the whole `<section>`, which
  // includes its own large block padding) and mixes a top-anchored start
  // with a bottom-anchored end, so the scroll distance the reveal plays
  // across scales with the prose's own height rather than a fixed
  // fraction of one viewport — the wave then plays while each paragraph
  // is actually passing through the readable band, and still finishes
  // while the last paragraph is fully on screen, well before it scrolls
  // past the top edge.
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start 0.85", "end 0.3"],
  });

  const paragraphs: readonly (readonly ManifestoSegment[])[] = useMemo(
    () => [
      [
        { text: t("about_p1_pre") },
        { text: t("about_p1_bold"), strong: true },
        { text: t("about_p1_post") },
      ],
      [{ text: t("about_p2") }],
      [
        { text: t("about_p3_pre") },
        { text: t("about_p3_bold"), strong: true },
        { text: t("about_p3_post") },
      ],
    ],
    [t]
  );

  const wordCounts = useMemo(
    () => paragraphs.map((segments) => segmentsToWords(segments).length),
    [paragraphs]
  );
  const total = wordCounts.reduce((sum, count) => sum + count, 0);
  const offsets = useMemo(() => {
    let running = 0;
    return wordCounts.map((count) => {
      const offset = running;
      running += count;
      return offset;
    });
  }, [wordCounts]);

  return (
    <section className="section about_me" id="about_me">
      <div className="content">
        <h2 className="title">{t("about_title")}</h2>
        <div className="about_me__content" ref={contentRef}>
          {paragraphs.map((segments, i) => (
            <ManifestoParagraph
              key={i}
              segments={segments}
              offset={offsets[i]}
              total={total}
              progress={scrollYProgress}
              motionAllowed={motionAllowed}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
