import "./App.scss";
import Experience from "./components/Experience/Experience";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-dark-blue/theme.css";
import "primeicons/primeicons.css";
import Projects from "./components/Projects/Projects";
import AboutMe from "./components/AboutMe/AboutMe";
import Technologies from "./components/Technologies/Technologies";
import Certifications from "./components/Certifications/Certifications";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <PrimeReactProvider>
      <Header />
      <Home />
      <Experience />
      <Projects />
      <AboutMe />
      <Certifications />
      <Technologies />
      <Footer />
    </PrimeReactProvider>
  );
}

export default App;
