"use client";

import { Macros } from "@/lib/types";
import { scaleMacros } from "@/lib/nutrition";

type Props = {
  baseMacros: Macros;
  portion: number;
  onChange: (portion: number) => void;
};

const MIN = 0.25;
const MAX = 2;
const STEP = 0.25;

export default function PortionAdjuster({ baseMacros, portion, onChange }: Props) {
  const scaled = scaleMacros(baseMacros, portion);
  const clamp = (n: number) => Math.min(MAX, Math.max(MIN, n));

  return (
    <div
      className="mt-2 flex items-center justify-between gap-2 rounded-xl px-3 py-2"
      style={{ background: "var(--surface-muted)" }}
    >
      <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
        Cantidad que comiste
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(clamp(portion - STEP))}
          aria-label="Comí menos"
          className="grid place-items-center h-6 w-6 rounded-full text-sm font-semibold"
          style={{ background: "var(--surface)" }}
        >
          −
        </button>
        <span className="text-xs w-24 text-center tabular-nums" style={{ color: "var(--foreground)" }}>
          {portion === 1 ? "Porción completa" : `${portion}× receta`}
        </span>
        <button
          onClick={() => onChange(clamp(portion + STEP))}
          aria-label="Comí más"
          className="grid place-items-center h-6 w-6 rounded-full text-sm font-semibold"
          style={{ background: "var(--surface)" }}
        >
          +
        </button>
        <span className="text-xs font-medium tabular-nums" style={{ color: "var(--text-secondary)" }}>
          ≈ {scaled.kcal} kcal
        </span>
      </div>
    </div>
  );
}
