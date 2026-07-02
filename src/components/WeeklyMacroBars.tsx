"use client";

import { Macros } from "@/lib/types";
import MacroBar from "./MacroBar";

type Props = {
  consumed: Macros;
  weeklyTarget: Macros;
};

export default function WeeklyMacroBars({ consumed, weeklyTarget }: Props) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-4">
      <h2 className="text-lg font-semibold">📊 Progreso semanal de macros</h2>
      <MacroBar
        label="Calorías"
        current={consumed.kcal}
        target={weeklyTarget.kcal}
        unit="kcal"
        color="bg-emerald-500"
      />
      <MacroBar
        label="Proteína"
        current={consumed.protein}
        target={weeklyTarget.protein}
        unit="g"
        color="bg-sky-500"
      />
      <MacroBar
        label="Carbohidratos"
        current={consumed.carbs}
        target={weeklyTarget.carbs}
        unit="g"
        color="bg-violet-500"
      />
      <MacroBar
        label="Grasas"
        current={consumed.fat}
        target={weeklyTarget.fat}
        unit="g"
        color="bg-amber-500"
      />
    </div>
  );
}
