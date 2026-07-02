export type GlossaryTerm = {
  term: string;
  short: string;
  full: string;
};

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: "BMR",
    short: "Metabolismo basal",
    full: "Las calorías que tu cuerpo quema en reposo absoluto (respirar, bombear sangre, mantener temperatura), sin contar ningún movimiento ni ejercicio. Es el punto de partida del cálculo.",
  },
  {
    term: "TDEE",
    short: "Gasto calórico total diario",
    full: "Tu BMR multiplicado por un factor de actividad que incluye tus entrenamientos (kettlebell, Muay Thai, yoga) y el movimiento del día a día. Es cuánto quemas en total en un día normal.",
  },
  {
    term: "Objetivo diario",
    short: "Meta de calorías",
    full: "Tu TDEE con el déficit calórico aplicado (15%). Es cuánto deberías comer al día para perder grasa de forma moderada sin perder músculo.",
  },
  {
    term: "Proteína",
    short: "Macro para preservar músculo",
    full: "Calculada en ~2 g por kg de peso corporal — la cantidad recomendada para mantener y ganar masa muscular mientras estás en déficit calórico.",
  },
  {
    term: "Carbs / Grasa",
    short: "Energía y hormonas",
    full: "Los carbohidratos alimentan tus entrenamientos de alta intensidad (kettlebell, Muay Thai); la grasa es esencial para la producción hormonal. Se reparten con el resto de las calorías tras fijar la proteína.",
  },
  {
    term: "Déficit calórico",
    short: "La resta que hace perder grasa",
    full: "Comer menos calorías de las que gastas (TDEE). Un déficit moderado (10-20%) permite perder grasa sin sacrificar tanto músculo ni rendimiento en el entrenamiento.",
  },
];

export function findTerm(term: string): GlossaryTerm | undefined {
  return GLOSSARY.find((g) => g.term === term);
}
