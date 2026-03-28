import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./i18n";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

const showPage = () => {
  document.body.style.visibility = "visible";
};
Promise.race([
  document.fonts.ready,
  new Promise<void>((resolve) => setTimeout(resolve, 2000)),
]).then(showPage);
