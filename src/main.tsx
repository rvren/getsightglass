import React from "react";
import ReactDOM from "react-dom/client";
import Sightglass from "./pages/Sightglass";
import "./index.css";

// This product site is intentionally light-only — a high-contrast, premium page.
document.documentElement.classList.remove("dark");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Sightglass />
  </React.StrictMode>,
);
