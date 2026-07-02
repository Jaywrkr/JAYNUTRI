"use client";

import { useEffect, useState } from "react";
import { loadTextScale, saveTextScale } from "@/lib/storage";

const MIN = 0.9;
const MAX = 1.25;
const STEP = 0.075;

export default function TextSizeControl() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const stored = loadTextScale();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage, not derivable during SSR
    setScale(stored);
    document.documentElement.style.setProperty("--text-scale", String(stored));
  }, []);

  const apply = (next: number) => {
    const clamped = Math.min(MAX, Math.max(MIN, next));
    setScale(clamped);
    saveTextScale(clamped);
    document.documentElement.style.setProperty("--text-scale", String(clamped));
  };

  return (
    <div
      className="flex items-center gap-0.5 rounded-xl px-1 h-9"
      style={{ background: "var(--surface-muted)" }}
    >
      <button
        onClick={() => apply(scale - STEP)}
        aria-label="Reducir tamaño de texto"
        className="grid place-items-center h-7 w-7 rounded-lg text-sm font-semibold focus-visible:outline focus-visible:outline-2"
        style={{ outlineColor: "var(--macro-protein)" }}
      >
        A-
      </button>
      <button
        onClick={() => apply(scale + STEP)}
        aria-label="Aumentar tamaño de texto"
        className="grid place-items-center h-7 w-7 rounded-lg text-base font-semibold focus-visible:outline focus-visible:outline-2"
        style={{ outlineColor: "var(--macro-protein)" }}
      >
        A+
      </button>
    </div>
  );
}
