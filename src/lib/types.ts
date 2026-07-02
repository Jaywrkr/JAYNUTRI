export type Macros = {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type Section =
  | "Proteínas"
  | "Verduras y frutas"
  | "Granos y legumbres"
  | "Lácteos y huevos"
  | "Grasas y condimentos"
  | "Otros";

export type Ingredient = {
  name: string;
  qty: string;
  section: Section;
  estCost: number; // USD, Ecuador usa dólar
};

export type MealType = "desayuno" | "almuerzo" | "cena";

export type Recipe = {
  id: string;
  name: string;
  mealType: MealType;
  prepMinutes: number;
  batchCook: boolean;
  macros: Macros;
  ingredients: Ingredient[];
  steps: string[];
  servings: number;
};

export type DayKey =
  | "lunes"
  | "martes"
  | "miercoles"
  | "jueves"
  | "viernes"
  | "sabado"
  | "domingo";

export type LunchSlot =
  | { type: "recipe"; recipe: Recipe }
  | { type: "mama" };

export type DayPlan = {
  day: DayKey;
  label: string;
  breakfast: Recipe;
  lunch: LunchSlot;
  dinner: Recipe;
  lucaJoins: boolean; // martes y viernes
};

export type MomLunchPortion = "liviano" | "normal" | "abundante" | "personalizado";

export type MomLunchLog = {
  description: string;
  portion: MomLunchPortion;
  macros: Macros;
};

export type ExtraEntry = {
  id: string;
  name: string;
  qtyLabel: string;
  macros: Macros;
};

export type DayLog = {
  breakfastEaten: boolean;
  lunchEaten: boolean;
  dinnerEaten: boolean;
  momLunch?: MomLunchLog;
  extras: ExtraEntry[];
  lunchPortion: number; // multiplicador sobre la receta del almuerzo (sábado/domingo)
};

export type Profile = {
  weightKg: number;
  heightCm: number;
  age: number;
  trainingDaysPerWeek: number;
  deficitPct: number;
};
