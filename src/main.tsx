import React from "react";
import ReactDOM from "react-dom/client";
import Sightglass from "./pages/Sightglass";
import { ThemeToggle } from "./components/ThemeToggle";
import { initTheme } from "./lib/theme";
import "./index.css";

initTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="min-h-screen bg-background">
      <header className="absolute right-4 top-4 z-50 sm:right-6 sm:top-6">
        <ThemeToggle />
      </header>
      <Sightglass />
    </div>
  </React.StrictMode>,
);
