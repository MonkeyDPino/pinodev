import "./Footer.scss";
import { useTranslation } from "react-i18next";
import { svgsConstants } from "../../constants/svgs";
import { cv } from "../../data/cv";

export default function Footer() {
  const { t } = useTranslation();
  const whatsappHref = `https://wa.me/${cv.phone.replace(/\D/g, "")}`;
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__grid">

          {/* Column 1: Brand */}
          <div className="footer__brand">
            <span className="footer__logo">pinodev</span>
            <p className="footer__tagline">
              {t("footer_tagline")}
            </p>
            <div className="footer__socials">
              {cv.socials.map((social) => (
                <a
                  key={social.kind}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="footer__social-icon"
                  aria-label={t(social.labelKey)}
                >
                  <img src={svgsConstants[social.kind]} alt={t(social.labelKey)} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer__links">
            <span className="footer__col-title">{t("footer_navigate")}</span>
            <nav className="footer__nav">
              <a href="#home">{t("nav_home")}</a>
              <a href="#experience">{t("nav_experience")}</a>
              <a href="#projects">{t("nav_projects")}</a>
              <a href="#about_me">{t("nav_about")}</a>
              <a href="#contact">{t("nav_contact")}</a>
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="footer__contact">
            <span className="footer__col-title">{t("footer_contact_col")}</span>
            <ul className="footer__contact-list">
              <li>
                <span className="footer__contact-icon footer__contact-icon--teal">@</span>
                <a href={`mailto:${cv.email}`}>{cv.email}</a>
              </li>
              <li>
                <span className="footer__contact-icon footer__contact-icon--lime">☎</span>
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  {cv.phone}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <span>{t("footer_copyright", { name: cv.shortName })}</span>
          <span className="footer__made-with">{t("footer_made_with")}</span>
        </div>
      </div>
    </footer>
  );
}
