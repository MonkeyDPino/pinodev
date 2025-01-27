import { svgsConstants } from "../../constants/svgs";
import VoltageButton from "../buttons/VoltageButton";
import "./Home.scss";

export default function Home() {
  return (
    <main className="section" id="home">
      <div className="content">
        <div className="home">
          <section className="info">
            <div className="title1">Hi, i'm</div>
            <div className="title2">Juan Esteban Pino</div>
            <div className="role">Full-stack Developer</div>
            <p className="description">
              <b>+2 years of experience.</b>{" "}
              <span className="third-color-dark">
                Systems Enginner and Full-stack Developer.
              </span>{" "}
              I enjoy adding value to people by building robust, reliable, and
              high-impact systems.
            </p>
            <section className="content__buttons">
              <div className="buttons">
                <VoltageButton
                  onClick={() => {
                    window.open(
                      "https://drive.google.com/file/d/1siS250uxdThB-UY0KvOyzffu_w2XiRtF/view?usp=sharing",
                      "_blank",
                      "noreferrer"
                    );
                  }}
                  title="Download CV"
                  svg="download"
                />
                <a
                  href="https://www.linkedin.com/in/juan-pino-vidal"
                  target="_blank"
                  rel="noreferrer"
                  className="button_icon"
                >
                  <img src={svgsConstants.linkedin} alt="LinkedIn" />
                </a>
                <a
                  href="https://github.com/MonkeyDPino"
                  target="_blank"
                  rel="noreferrer"
                  className="button_icon"
                >
                  <img src={svgsConstants.github} alt="GitHub" />
                </a>
                <a
                  href="https://www.instagram.com/juan.pino.02"
                  target="_blank"
                  rel="noreferrer"
                  className="button_icon"
                >
                  <img src={svgsConstants.instagram} alt="Instagram" />
                </a>
              </div>
            </section>
          </section>
          <section className="image">
            <a href="#about_me">
              <div className="profile__image">
                <img
                  src="https://www.gravatar.com/avatar/0?d=mp"
                  alt="Profile"
                />
              </div>
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}
