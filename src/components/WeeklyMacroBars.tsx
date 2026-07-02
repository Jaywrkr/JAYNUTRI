"use client";

import { Macros } from "@/lib/types";
import MacroBar from "./MacroBar";

type Props = {
  consumed: Macros;
  weeklyTarget: Macros;
};

export default function WeeklyMacroBars({ consumed, weeklyTarget }: Props) {
  return (
    <div className="glass-card rounded-3xl p-5 sm:p-6 space-y-5">
      <div className="flex items-center gap-2">
        <span className="grid place-items-center h-8 w-8 rounded-xl text-base bg-[color-mix(in_oklab,var(--macro-protein)_18%,transparent)]">
          📊
        </span>
        <h2 className="text-lg font-semibold">Progreso semanal de macros</h2>
      </div>
      <MacroBar label="Calorías" current={consumed.kcal} target={weeklyTarget.kcal} unit="kcal" color="kcal" />
      <MacroBar label="Proteína" current={consumed.protein} target={weeklyTarget.protein} unit="g" color="protein" />
      <MacroBar label="Carbohidratos" current={consumed.carbs} target={weeklyTarget.carbs} unit="g" color="carbs" />
      <MacroBar label="Grasas" current={consumed.fat} target={weeklyTarget.fat} unit="g" color="fat" />
    </div>
  );
}
