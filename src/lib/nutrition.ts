import { Macros, Profile } from "./types";

export const DEFAULT_PROFILE: Profile = {
  weightKg: 72.6, // 160 lb
  heightCm: 175,
  age: 36,
  trainingDaysPerWeek: 5,
  deficitPct: 15,
};

/**
 * Fórmula Mifflin-St Jeor (hombre) + factor de actividad por entrenamientos
 * combinados de kettlebell, Muay Thai y yoga (5x/semana = actividad moderada-alta).
 * Déficit moderado (15%) para perder grasa preservando/ganando masa muscular,
 * con proteína alta (2.0 g/kg) para sostener el músculo en déficit.
 */
export function calcTargets(profile: Profile) {
  const { weightKg, heightCm, age, trainingDaysPerWeek, deficitPct } = profile;

  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;

  const activityFactor =
    trainingDaysPerWeek >= 6 ? 1.725 : trainingDaysPerWeek >= 3 ? 1.55 : 1.375;

  const tdee = bmr * activityFactor;
  const targetKcal = Math.round(tdee * (1 - deficitPct / 100));

  const proteinG = Math.round(weightKg * 2.0);
  const fatG = Math.round((targetKcal * 0.25) / 9);
  const proteinKcal = proteinG * 4;
  const fatKcal = fatG * 9;
  const carbsG = Math.max(0, Math.round((targetKcal - proteinKcal - fatKcal) / 4));

  const macros: Macros = {
    kcal: targetKcal,
    protein: proteinG,
    carbs: carbsG,
    fat: fatG,
  };

  return { bmr: Math.round(bmr), tdee: Math.round(tdee), activityFactor, macros };
}

export function sumMacros(list: Macros[]): Macros {
  return list.reduce(
    (acc, m) => ({
      kcal: acc.kcal + m.kcal,
      protein: acc.protein + m.protein,
      carbs: acc.carbs + m.carbs,
      fat: acc.fat + m.fat,
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

export function scaleMacros(m: Macros, factor: number): Macros {
  return {
    kcal: Math.round(m.kcal * factor),
    protein: Math.round(m.protein * factor),
    carbs: Math.round(m.carbs * factor),
    fat: Math.round(m.fat * factor),
  };
}

export const MOM_LUNCH_ESTIMATES: Record<
  "liviano" | "normal" | "abundante",
  Macros
> = {
  liviano: { kcal: 450, protein: 30, carbs: 40, fat: 15 },
  normal: { kcal: 650, protein: 40, carbs: 65, fat: 22 },
  abundante: { kcal: 850, protein: 48, carbs: 90, fat: 30 },
};
