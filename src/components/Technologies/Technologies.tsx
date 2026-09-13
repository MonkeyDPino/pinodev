import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { svgsConstants } from "../../constants/svgs";
import { techLabels } from "../../constants/techLabels";
import { cv } from "../../data/cv";
import type { CvCoreSkillGroup, CvExtendedSkillCluster } from "../../types/cv.type";
import "./Technologies.scss";

function TechCategory({ labelKey, items }: CvCoreSkillGroup) {
  const { t } = useTranslation();
  const listRef = useScrollReveal<HTMLDivElement>();

  return (
    <div className="technology">
      <div className="technology__name">{t(labelKey)}</div>
      <div
        className="technology__list reveal stagger-children"
        ref={listRef}
      >
        {items.map((item, i) => (
          <div
            key={item}
            className="technology__item"
            style={{ '--i': i } as React.CSSProperties}
          >
            <img src={svgsConstants[item]} alt={techLabels[item]} />
            <div>{techLabels[item]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExtendedSkillCluster({ labelKey, items }: CvExtendedSkillCluster) {
  const { t } = useTranslation();

  return (
    <div className="technology">
      <div className="technology__name">{t(labelKey)}</div>
      <p className="technology__extended-list">{items.join(" · ")}</p>
    </div>
  );
}

export default function Technologies() {
  const { t } = useTranslation();

  return (
    <section className="section technologies" id="technologies">
      <div className="content">
        <div className="title">{t("technologies_title")}</div>
        <div className="technologies__content">
          <article className="technologies__content__list">
            {cv.coreSkills.map((group) => (
              <TechCategory key={group.labelKey} {...group} />
            ))}
          </article>
          <article className="technologies__content__extended">
            {cv.extendedSkills.map((cluster) => (
              <ExtendedSkillCluster key={cluster.labelKey} {...cluster} />
            ))}
          </article>
        </div>
      </div>
    </section>
  );
}
