import { Macros } from "./types";

export function buildWeeklyInsight(
  consumed: Macros,
  weeklyTarget: Macros,
  elapsedFraction: number
): string {
  if (elapsedFraction <= 0 || consumed.kcal === 0) {
    return "Marca tus comidas del día para ver cómo vas esta semana.";
  }

  const expectedKcal = weeklyTarget.kcal * elapsedFraction;
  const expectedProtein = weeklyTarget.protein * elapsedFraction;

  const kcalDiffPct =
    expectedKcal > 0 ? Math.round(((consumed.kcal - expectedKcal) / expectedKcal) * 100) : 0;
  const proteinDiffPct =
    expectedProtein > 0
      ? Math.round(((consumed.protein - expectedProtein) / expectedProtein) * 100)
      : 0;

  const parts: string[] = [];

  if (Math.abs(proteinDiffPct) >= 8) {
    parts.push(
      proteinDiffPct > 0
        ? `vas ${proteinDiffPct}% arriba en proteína respecto al ritmo esperado — bien para preservar músculo`
        : `vas ${Math.abs(proteinDiffPct)}% abajo en proteína respecto al ritmo esperado`
    );
  }

  if (Math.abs(kcalDiffPct) >= 10) {
    parts.push(
      kcalDiffPct > 0
        ? `${kcalDiffPct}% arriba en calorías respecto al ritmo del déficit`
        : `${Math.abs(kcalDiffPct)}% abajo en calorías — ojo con no quedarte corto de energía`
    );
  }

  if (parts.length === 0) {
    return "Vas justo al ritmo esperado del objetivo semanal. 🎯";
  }

  return "Esta semana " + parts.join(" y ") + ".";
}
