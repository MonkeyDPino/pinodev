import "./Footer.scss";
import { svgsConstants } from "../../constants/svgs";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__grid">

          {/* Column 1: Brand */}
          <div className="footer__brand">
            <span className="footer__logo">pinodev</span>
            <p className="footer__tagline">
              Building fast, thoughtful software that people enjoy.
            </p>
            <div className="footer__socials">
              <a
                href="https://www.linkedin.com/in/juan-pino-vidal"
                target="_blank"
                rel="noreferrer"
                className="footer__social-icon"
                aria-label="LinkedIn"
              >
                <img src={svgsConstants.linkedin} alt="LinkedIn" />
              </a>
              <a
                href="https://github.com/MonkeyDPino"
                target="_blank"
                rel="noreferrer"
                className="footer__social-icon"
                aria-label="GitHub"
              >
                <img src={svgsConstants.github} alt="GitHub" />
              </a>
              <a
                href="https://www.instagram.com/juan.pino.02"
                target="_blank"
                rel="noreferrer"
                className="footer__social-icon"
                aria-label="Instagram"
              >
                <img src={svgsConstants.instagram} alt="Instagram" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer__links">
            <span className="footer__col-title">Navigate</span>
            <nav className="footer__nav">
              <a href="#home">Home</a>
              <a href="#experience">Experience</a>
              <a href="#projects">Projects</a>
              <a href="#about_me">About Me</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="footer__contact">
            <span className="footer__col-title">Contact</span>
            <ul className="footer__contact-list">
              <li>
                <span className="footer__contact-icon footer__contact-icon--teal">@</span>
                <a href="mailto:juanrespolo@gmail.com">juanrespolo@gmail.com</a>
              </li>
              <li>
                <span className="footer__contact-icon footer__contact-icon--lime">☎</span>
                <a href="https://wa.me/573233927516" target="_blank" rel="noreferrer">
                  +57 323 392 7516
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <span>© 2026 Juan Pino. All rights reserved.</span>
          <span className="footer__made-with">Made with ♥</span>
        </div>
      </div>
    </footer>
  );
}
