"use client";

import { Macros } from "@/lib/types";
import MacroBarsList from "./MacroBarsList";

type Props = {
  consumed: Macros;
  target: Macros;
};

export default function DailyMacroBars({ consumed, target }: Props) {
  return (
    <div className="glass-card rounded-[28px] p-5 sm:p-6 space-y-5">
      <div className="flex items-center gap-2">
        <span className="grid place-items-center h-8 w-8 rounded-xl text-base bg-[color-mix(in_oklab,var(--macro-kcal)_18%,transparent)]">
          📈
        </span>
        <h2 className="text-lg font-semibold">Progreso de hoy</h2>
      </div>

      <MacroBarsList consumed={consumed} target={target} periodLabel="hoy" />
    </div>
  );
}
