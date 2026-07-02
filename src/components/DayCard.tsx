"use client";

import { DayPlan, DayLog, Macros, MomLunchLog } from "@/lib/types";
import RecipeCard from "./RecipeCard";
import MomLunchLogger from "./MomLunchLogger";

type Props = {
  day: DayPlan;
  log: DayLog;
  dailyTarget: Macros;
  onToggleMeal: (meal: "breakfastEaten" | "lunchEaten" | "dinnerEaten") => void;
  onSaveMomLunch: (log: MomLunchLog) => void;
  onClearMomLunch: () => void;
};

export default function DayCard({
  day,
  log,
  dailyTarget,
  onToggleMeal,
  onSaveMomLunch,
  onClearMomLunch,
}: Props) {
  const consumedSoFar: Macros = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
  if (log.breakfastEaten) {
    consumedSoFar.kcal += day.breakfast.macros.kcal;
    consumedSoFar.protein += day.breakfast.macros.protein;
    consumedSoFar.carbs += day.breakfast.macros.carbs;
    consumedSoFar.fat += day.breakfast.macros.fat;
  }
  if (log.lunchEaten) {
    const lunchMacros =
      day.lunch.type === "recipe" ? day.lunch.recipe.macros : log.momLunch?.macros;
    if (lunchMacros) {
      consumedSoFar.kcal += lunchMacros.kcal;
      consumedSoFar.protein += lunchMacros.protein;
      consumedSoFar.carbs += lunchMacros.carbs;
      consumedSoFar.fat += lunchMacros.fat;
    }
  }

  const remaining: Macros = {
    kcal: Math.max(0, dailyTarget.kcal - consumedSoFar.kcal),
    protein: Math.max(0, dailyTarget.protein - consumedSoFar.protein),
    carbs: Math.max(0, dailyTarget.carbs - consumedSoFar.carbs),
    fat: Math.max(0, dailyTarget.fat - consumedSoFar.fat),
  };

  const dinnerFit = day.dinner.macros.kcal - remaining.kcal;

  return (
    <div className="glass-card rounded-[28px] p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">{day.label}</h3>
        {day.lucaJoins && (
          <span
            className="text-[10px] uppercase tracking-wide rounded-full px-2.5 py-1 font-medium text-white"
            style={{ background: "linear-gradient(90deg, var(--macro-carbs), var(--macro-fat))" }}
          >
            👦 con Luca
          </span>
        )}
      </div>

      <div>
        <p className="text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>
          Desayuno
        </p>
        <RecipeCard
          recipe={day.breakfast}
          eaten={log.breakfastEaten}
          onToggle={() => onToggleMeal("breakfastEaten")}
        />
      </div>

      <div>
        <p className="text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>
          Almuerzo
        </p>
        {day.lunch.type === "recipe" ? (
          <RecipeCard
            recipe={day.lunch.recipe}
            eaten={log.lunchEaten}
            onToggle={() => onToggleMeal("lunchEaten")}
          />
        ) : (
          <div className="space-y-2">
            <MomLunchLogger
              log={log.momLunch}
              onSave={(l) => {
                onSaveMomLunch(l);
                if (!log.lunchEaten) onToggleMeal("lunchEaten");
              }}
              onClear={onClearMomLunch}
            />
            {!log.lunchEaten && log.momLunch && (
              <button
                onClick={() => onToggleMeal("lunchEaten")}
                className="text-xs font-medium hover:underline"
                style={{ color: "var(--macro-protein)" }}
              >
                Marcar almuerzo como comido
              </button>
            )}
          </div>
        )}
      </div>

      <div>
        <p className="text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>
          Cena {day.lucaJoins && "(porción extra para Luca)"}
        </p>
        <RecipeCard
          recipe={day.dinner}
          eaten={log.dinnerEaten}
          onToggle={() => onToggleMeal("dinnerEaten")}
        />
      </div>

      {!log.dinnerEaten && (log.breakfastEaten || log.lunchEaten) && (
        <div
          className="rounded-2xl px-3.5 py-2.5 text-xs"
          style={{ background: "var(--surface-muted)", color: "var(--text-secondary)" }}
        >
          Te quedan{" "}
          <strong style={{ color: "var(--foreground)" }}>{remaining.kcal} kcal</strong> y{" "}
          <strong style={{ color: "var(--foreground)" }}>{remaining.protein} g proteína</strong>{" "}
          para la cena.{" "}
          {dinnerFit > 150
            ? "Esta cena se pasa un poco del restante — sirve una porción algo más chica."
            : dinnerFit < -150
            ? "Te sobra margen — puedes servir una porción algo más grande."
            : "La cena planeada encaja bien con lo que te queda."}
        </div>
      )}
    </div>
  );
}
