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

function App() {
  const { t } = useTranslation();

  return (
    <>
      <a className="skip-link" href="#main">
        {t("skip_to_content")}
      </a>
      <div className="spine" aria-hidden="true">
        <div className="spine__fill" />
      </div>
      <Header />
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
      <Footer />
    </>
  );
}

export default App;
