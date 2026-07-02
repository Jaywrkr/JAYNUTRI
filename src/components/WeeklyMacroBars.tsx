"use client";

import { Macros } from "@/lib/types";
import MacroBar from "./MacroBar";

type Props = {
  consumed: Macros;
  weeklyTarget: Macros;
  insight: string;
};

export default function WeeklyMacroBars({ consumed, weeklyTarget, insight }: Props) {
  return (
    <div className="glass-card rounded-[28px] p-5 sm:p-6 space-y-5">
      <div className="flex items-center gap-2">
        <span className="grid place-items-center h-8 w-8 rounded-xl text-base bg-[color-mix(in_oklab,var(--macro-protein)_18%,transparent)]">
          📊
        </span>
        <h2 className="text-lg font-semibold">Progreso semanal de macros</h2>
      </div>

      <p
        className="text-xs rounded-xl px-3 py-2"
        style={{ background: "var(--surface-muted)", color: "var(--text-secondary)" }}
      >
        💡 {insight}
      </p>

      <MacroBar
        label="Calorías"
        current={consumed.kcal}
        target={weeklyTarget.kcal}
        unit="kcal"
        color="kcal"
        tip="Suma de las calorías de todas las comidas que has marcado como comidas esta semana, comparada contra tu objetivo semanal (objetivo diario × 7)."
      />
      <MacroBar
        label="Proteína"
        current={consumed.protein}
        target={weeklyTarget.protein}
        unit="g"
        color="protein"
        tip="Gramos de proteína acumulados esta semana. Mantenerla alta es lo que más ayuda a preservar músculo mientras estás en déficit."
      />
      <MacroBar
        label="Carbohidratos"
        current={consumed.carbs}
        target={weeklyTarget.carbs}
        unit="g"
        color="carbs"
        tip="Combustible principal para tus entrenamientos de alta intensidad (kettlebell, Muay Thai)."
      />
      <MacroBar
        label="Grasas"
        current={consumed.fat}
        target={weeklyTarget.fat}
        unit="g"
        color="fat"
        tip="Grasas saludables necesarias para la producción hormonal — no conviene bajarlas demasiado."
      />
    </div>
  );
}
