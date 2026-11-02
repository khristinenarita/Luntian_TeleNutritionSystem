"use client";
import { useEffect } from "react";

// Layers are loaded in order: data -> domain -> ui
const LAYERS = ["/js/data.js", "/js/domain.js", "/js/ui.js"];

function load(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.onload = resolve;
    s.onerror = () => reject(new Error("Could not load " + src));
    document.body.appendChild(s);
  });
}

export default function Home() {
  useEffect(() => {
    if (window.__luntian) return; // guard against React strict-mode double mount
    window.__luntian = true;
    (async () => {
      for (const src of LAYERS) await load(src);
      await window.startLuntian();
    })().catch((e) => {
      document.getElementById("view").textContent = e.message;
    });
  }, []);

  return (
    <>
      <header>
        <h1 style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="36" height="36" viewBox="0 0 34 34" aria-hidden="true">
            <circle cx="17" cy="17" r="17" fill="#fff" />
            <path d="M9 25c0-9 6-15 16-16 0 10-6 16-16 16z" fill="#16a34a" />
            <path d="M10 24l9-9" stroke="#fff" strokeWidth="2" />
          </svg>
          Luntian <span style={{ fontWeight: 400, fontSize: ".8rem", opacity: 0.9 }}>tele-nutrition</span>
        </h1>
        <div id="who"></div>
      </header>
      <main>
        <nav id="nav" aria-label="Modules"></nav>
        <div id="view"></div>
      </main>
    </>
  );
}
