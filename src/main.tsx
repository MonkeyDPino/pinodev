import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Self-hosted variable fonts (replaces the removed Google Fonts <link>).
// `wdth.css` is the entry that bundles both the `wdth` and `wght` axes;
// the default `index.css` entry only carries `wght`.
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/jetbrains-mono";
import "./index.scss";
import "./i18n";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
