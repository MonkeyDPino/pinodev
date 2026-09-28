import { LazyMotion, MotionConfig, domMax } from "motion/react";
import { useTranslation } from "react-i18next";
import "./App.scss";
import Experience from "./components/Experience/Experience";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Projects from "./components/Projects/Projects";
import AboutMe from "./components/AboutMe/AboutMe";
import Contact from "./components/Contact/Contact";
import Education from "./components/Education/Education";
import Technologies from "./components/Technologies/Technologies";
import Certifications from "./components/Certifications/Certifications";
import Footer from "./components/Footer/Footer";
import SectionCube from "./components/SectionCube/SectionCube";

function App() {
  const { t } = useTranslation();

  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">
        <a className="skip-link" href="#main">
          {t("skip_to_content")}
        </a>
        <Header />
        <div className="layout">
          <SectionCube />
          <main id="main" tabIndex={-1}>
            <Home />
            <Experience />
            <Projects />
            <AboutMe />
            <Contact />
            <Education />
            <Certifications />
            <Technologies />
          </main>
        </div>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
