"use client";

import { useEffect, useState } from "react";
import { loadTheme, saveTheme, Theme } from "@/lib/storage";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = loadTheme();
    const initial =
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage/matchMedia, not derivable during SSR
    setTheme(initial);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    saveTheme(next);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="grid place-items-center h-9 w-9 rounded-xl text-base shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{ background: "var(--surface-muted)", outlineColor: "var(--macro-protein)" }}
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
