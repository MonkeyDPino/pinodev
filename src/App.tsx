import "./App.scss";
import Experience from "./components/Experience/Experience";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-dark-blue/theme.css";
import "primeicons/primeicons.css";
import Projects from "./components/Projects/Projects";
import AboutMe from "./components/AboutMe/AboutMe";

function App() {
  return (
    <PrimeReactProvider>
      <Header />
      <Home />
      <Experience />
      <Projects />
      <AboutMe />
    </PrimeReactProvider>
  );
}

export default App;
