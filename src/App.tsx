import "./App.scss";
import Experience from "./components/Experience/Experience";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Projects from "./components/Projects/Projects";
import AboutMe from "./components/AboutMe/AboutMe";
import Contact from "./components/Contact/Contact";
import Technologies from "./components/Technologies/Technologies";
import Certifications from "./components/Certifications/Certifications";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <div className="spine" aria-hidden="true">
        <div className="spine__fill" />
      </div>
      <Header />
      <Home />
      <Experience />
      <Projects />
      <AboutMe />
      <Contact />
      <Certifications />
      <Technologies />
      <Footer />
    </>
  );
}

export default App;
