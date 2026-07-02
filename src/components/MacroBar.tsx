"use client";

import { useEffect, useState } from "react";
import InfoTooltip from "./InfoTooltip";

export type MacroColor = "kcal" | "protein" | "carbs" | "fat";

type Props = {
  label: string;
  current: number;
  target: number;
  unit: string;
  color: MacroColor;
  tip?: string;
};

const GRADIENTS: Record<MacroColor, string> = {
  kcal: "linear-gradient(90deg, var(--macro-kcal), var(--macro-kcal-2))",
  protein: "linear-gradient(90deg, var(--macro-protein), var(--macro-protein-2))",
  carbs: "linear-gradient(90deg, var(--macro-carbs), var(--macro-carbs-2))",
  fat: "linear-gradient(90deg, var(--macro-fat), var(--macro-fat-2))",
};

const DOT: Record<MacroColor, string> = {
  kcal: "var(--macro-kcal)",
  protein: "var(--macro-protein)",
  carbs: "var(--macro-carbs)",
  fat: "var(--macro-fat)",
};

export default function MacroBar({ label, current, target, unit, color, tip }: Props) {
  const [width, setWidth] = useState(0);
  // Objetivo obligatorio: hay que LLEGAR al 100%, no quedarse corto por seguridad.
  const realPct = target > 0 ? Math.round((current / target) * 100) : 0;
  const barPct = Math.min(100, realPct);
  const done = realPct >= 100;

  useEffect(() => {
    const t = setTimeout(() => setWidth(barPct), 80);
    return () => clearTimeout(t);
  }, [barPct]);

  return (
    <div>
      <div className="flex items-baseline justify-between text-sm mb-1.5">
        <span className="font-medium flex items-center gap-1.5" style={{ color: "var(--foreground)" }}>
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: DOT[color] }}
          />
          {label}
          {tip && <InfoTooltip title={label}>{tip}</InfoTooltip>}
        </span>
        <span style={{ color: "var(--text-secondary)" }} className="tabular-nums text-xs sm:text-sm">
          {Math.round(current)} / {Math.round(target)} {unit}
          <span
            className="ml-1.5 font-semibold"
            style={{ color: done ? "var(--brand-orange)" : "var(--foreground)" }}
          >
            {done ? "✓ " : ""}
            {realPct}%
          </span>
        </span>
      </div>
      <div
        className="h-2.5 w-full rounded-full overflow-hidden"
        style={{ background: "var(--surface-muted)" }}
      >
        <div
          className="h-full rounded-full transition-[width] duration-1000 ease-out"
          style={{
            width: `${width}%`,
            background: GRADIENTS[color],
            boxShadow: `0 0 12px 0 color-mix(in oklab, ${DOT[color]} 55%, transparent)`,
          }}
        />
      </div>
    </div>
  );
}
