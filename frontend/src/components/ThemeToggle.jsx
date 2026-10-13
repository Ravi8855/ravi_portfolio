// src/components/ThemeToggle.jsx
import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("site-theme") || "system";
    } catch { return "system"; }
  });

  useEffect(() => {
    applyTheme(theme);
    try { localStorage.setItem("site-theme", theme); } catch {}
  }, [theme]);

  function applyTheme(value) {
    const html = document.documentElement;
    html.classList.remove("light", "dark");
    if (value === "system") {
      // Use OS/browser preference
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      html.classList.add(prefersDark ? "dark" : "light");
    } else {
      html.classList.add(value);
    }
  }

  return (
    <div className="theme-toggle">
      <label className="toggle-label">Theme</label>
      <div className="toggle-options">
        <button className={`chip ${theme === "light" ? "active" : ""}`} onClick={() => setTheme("light")}>Light</button>
        <button className={`chip ${theme === "dark" ? "active" : ""}`} onClick={() => setTheme("dark")}>Dark</button>
        <button className={`chip ${theme === "system" ? "active" : ""}`} onClick={() => setTheme("system")}>System</button>
      </div>
    </div>
  );
}
