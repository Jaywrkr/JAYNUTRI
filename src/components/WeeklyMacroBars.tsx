"use client";

import { useState } from "react";
import { Macros } from "@/lib/types";
import MacroBarsList from "./MacroBarsList";

type Props = {
  consumed: Macros;
  weeklyTarget: Macros;
  insight: string;
};

export default function WeeklyMacroBars({ consumed, weeklyTarget, insight }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass-card rounded-[28px] p-5 sm:p-6">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <span className="grid place-items-center h-8 w-8 rounded-xl text-base bg-[color-mix(in_oklab,var(--macro-protein)_18%,transparent)]">
            📊
          </span>
          <h2 className="text-lg font-semibold">Progreso semanal de macros</h2>
        </span>
        <span
          className="text-xs font-medium shrink-0 flex items-center gap-1"
          style={{ color: "var(--text-secondary)" }}
        >
          {open ? "Ocultar" : "Ver semana"}
          <span
            className="inline-block transition-transform"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            ▾
          </span>
        </span>
      </button>

      {open && (
        <div className="mt-5 space-y-5">
          <p
            className="text-xs rounded-xl px-3 py-2"
            style={{ background: "var(--surface-muted)", color: "var(--text-secondary)" }}
          >
            💡 {insight}
          </p>
          <MacroBarsList consumed={consumed} target={weeklyTarget} periodLabel="esta semana" />
        </div>
      )}
    </div>
  );
}
