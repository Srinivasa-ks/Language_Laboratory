import React from "react";
import ReactDOM from "react-dom/client";

/* Self-hosted variable fonts — zero network requests for typography */
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/spline-sans";
import "@fontsource-variable/spline-sans-mono";
import "@fontsource-variable/noto-sans";

import "./index.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

/* Register the offline service worker */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {
      /* SW is a progressive enhancement — the lab still works without it */
    });
  });
}
