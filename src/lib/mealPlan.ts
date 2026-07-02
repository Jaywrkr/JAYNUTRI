import { DayKey, DayPlan, Recipe } from "./types";

// Recetas de desayuno (en casa, con proteína en polvo contabilizada)
const desayunoBatido: Recipe = {
  id: "des-batido-avena",
  name: "Batido proteico de avena y plátano",
  mealType: "desayuno",
  prepMinutes: 5,
  batchCook: false,
  macros: { kcal: 470, protein: 41, carbs: 54, fat: 11 },
  servings: 1,
  ingredients: [
    { name: "Proteína en polvo (whey)", qty: "1 scoop (30 g)", section: "Otros", estCost: 0.9 },
    { name: "Avena en hojuelas", qty: "40 g", section: "Granos y legumbres", estCost: 0.2 },
    { name: "Plátano (guineo)", qty: "1 unidad", section: "Verduras y frutas", estCost: 0.15 },
    { name: "Leche deslactosada o bebida vegetal", qty: "250 ml", section: "Lácteos y huevos", estCost: 0.35 },
    { name: "Maní natural", qty: "10 g", section: "Grasas y condimentos", estCost: 0.1 },
  ],
  steps: [
    "Licuar la avena, el plátano, la leche y la proteína hasta homogeneizar.",
    "Servir y espolvorear el maní picado.",
  ],
};

const desayunoTortilla: Recipe = {
  id: "des-tortilla-claras",
  name: "Tortilla de claras con espinaca + proteína en polvo",
  mealType: "desayuno",
  prepMinutes: 10,
  batchCook: false,
  macros: { kcal: 460, protein: 43, carbs: 42, fat: 14 },
  servings: 1,
  ingredients: [
    { name: "Claras de huevo", qty: "4 unidades", section: "Lácteos y huevos", estCost: 0.6 },
    { name: "Huevo entero", qty: "1 unidad", section: "Lácteos y huevos", estCost: 0.15 },
    { name: "Espinaca fresca", qty: "1 puñado", section: "Verduras y frutas", estCost: 0.3 },
    { name: "Pan integral o tostadas de arroz", qty: "2 unidades", section: "Granos y legumbres", estCost: 0.4 },
    { name: "Proteína en polvo (whey)", qty: "1/2 scoop (15 g) en agua aparte", section: "Otros", estCost: 0.45 },
  ],
  steps: [
    "Batir las claras con el huevo entero, saltear con la espinaca en sartén antiadherente.",
    "Acompañar con el pan integral y un vaso pequeño de proteína disuelta en agua.",
  ],
};

const desayunoYogur: Recipe = {
  id: "des-yogur-proteico",
  name: "Yogur griego con proteína, maní y avena",
  mealType: "desayuno",
  prepMinutes: 3,
  batchCook: false,
  macros: { kcal: 480, protein: 44, carbs: 46, fat: 13 },
  servings: 1,
  ingredients: [
    { name: "Yogur griego natural sin azúcar", qty: "200 g", section: "Lácteos y huevos", estCost: 1.1 },
    { name: "Proteína en polvo (whey)", qty: "1/2 scoop (15 g)", section: "Otros", estCost: 0.45 },
    { name: "Avena en hojuelas", qty: "30 g", section: "Granos y legumbres", estCost: 0.15 },
    { name: "Maní natural", qty: "15 g", section: "Grasas y condimentos", estCost: 0.15 },
  ],
  steps: [
    "Mezclar el yogur con la proteína en polvo hasta integrar.",
    "Agregar la avena y el maní encima. Servir frío.",
  ],
};

// Almuerzos de fin de semana (los días de semana el almuerzo es en casa de mamá)
const almuerzoQuinoaPollo: Recipe = {
  id: "alm-bowl-quinoa-pollo",
  name: "Bowl de quinoa, pollo y vegetales asados",
  mealType: "almuerzo",
  prepMinutes: 30,
  batchCook: true,
  macros: { kcal: 700, protein: 48, carbs: 70, fat: 20 },
  servings: 2,
  ingredients: [
    { name: "Pechuga de pollo", qty: "1 lb", section: "Proteínas", estCost: 3.2 },
    { name: "Quinoa", qty: "1 taza (uncooked)", section: "Granos y legumbres", estCost: 1.3 },
    { name: "Brócoli", qty: "1 lb", section: "Verduras y frutas", estCost: 0.9 },
    { name: "Zanahoria", qty: "0.5 lb", section: "Verduras y frutas", estCost: 0.3 },
    { name: "Aceite de oliva", qty: "2 cda", section: "Grasas y condimentos", estCost: 0.5 },
    { name: "Ajo, comino, sal, pimienta", qty: "al gusto", section: "Grasas y condimentos", estCost: 0.3 },
  ],
  steps: [
    "Cocinar la quinoa en agua con sal (1:2) por 15 min.",
    "Sazonar y hornear/saltear el pollo en cubos.",
    "Asar el brócoli y la zanahoria con aceite de oliva.",
    "Armar el bowl y dividir en 2 porciones.",
  ],
};

const almuerzoAtunHuevo: Recipe = {
  id: "alm-ensalada-atun-huevo",
  name: "Ensalada completa de atún, huevo y camote",
  mealType: "almuerzo",
  prepMinutes: 20,
  batchCook: false,
  macros: { kcal: 620, protein: 42, carbs: 55, fat: 22 },
  servings: 1,
  ingredients: [
    { name: "Atún en agua (lata)", qty: "1 lata (170 g)", section: "Proteínas", estCost: 1.8 },
    { name: "Huevo entero", qty: "2 unidades", section: "Lácteos y huevos", estCost: 0.3 },
    { name: "Camote", qty: "0.5 lb", section: "Verduras y frutas", estCost: 0.3 },
    { name: "Tomate riñón", qty: "1 unidad", section: "Verduras y frutas", estCost: 0.35 },
    { name: "Pepino", qty: "1 unidad", section: "Verduras y frutas", estCost: 0.4 },
    { name: "Aguacate", qty: "1/2 unidad", section: "Verduras y frutas", estCost: 0.25 },
    { name: "Aceite de oliva y limón", qty: "1 cda + 1 unidad", section: "Grasas y condimentos", estCost: 0.35 },
  ],
  steps: [
    "Hervir el camote en cubos y los huevos.",
    "Mezclar todos los ingredientes en un bowl grande.",
    "Aliñar con aceite de oliva y limón.",
  ],
};

// Cenas batch-cooking (se preparan el domingo y rinden para varios días)
const cenaPolloHorno: Recipe = {
  id: "cena-pollo-horno-quinoa",
  name: "Pollo al horno con quinoa y brócoli (batch)",
  mealType: "cena",
  prepMinutes: 40,
  batchCook: true,
  macros: { kcal: 980, protein: 66, carbs: 120, fat: 24 },
  servings: 3,
  ingredients: [
    { name: "Pechuga de pollo", qty: "2 lb", section: "Proteínas", estCost: 6.4 },
    { name: "Quinoa", qty: "1.5 tazas (uncooked)", section: "Granos y legumbres", estCost: 2.0 },
    { name: "Brócoli", qty: "1.5 lb", section: "Verduras y frutas", estCost: 1.35 },
    { name: "Cebolla y ajo", qty: "1 unidad + 4 dientes", section: "Verduras y frutas", estCost: 0.5 },
    { name: "Aceite de oliva", qty: "3 cda", section: "Grasas y condimentos", estCost: 0.7 },
    { name: "Especias (comino, orégano, pimentón)", qty: "al gusto", section: "Grasas y condimentos", estCost: 0.4 },
  ],
  steps: [
    "Marinar el pollo con especias, ajo y aceite de oliva.",
    "Hornear a 200°C por 30-35 min.",
    "Cocinar la quinoa y asar el brócoli al vapor.",
    "Porcionar en 3 tarrinas para batch cooking.",
  ],
};

const cenaLentejas: Recipe = {
  id: "cena-lentejas-arroz",
  name: "Lentejas guisadas con arroz integral y ensalada",
  mealType: "cena",
  prepMinutes: 35,
  batchCook: true,
  macros: { kcal: 950, protein: 58, carbs: 140, fat: 18 },
  servings: 3,
  ingredients: [
    { name: "Lentejas", qty: "1.5 tazas (uncooked)", section: "Granos y legumbres", estCost: 1.7 },
    { name: "Arroz integral", qty: "1.5 tazas (uncooked)", section: "Granos y legumbres", estCost: 1.8 },
    { name: "Pechuga de pollo (para reforzar proteína)", qty: "0.75 lb", section: "Proteínas", estCost: 2.4 },
    { name: "Tomate riñón y cebolla", qty: "2 unidades + 1 unidad", section: "Verduras y frutas", estCost: 0.7 },
    { name: "Zanahoria", qty: "0.5 lb", section: "Verduras y frutas", estCost: 0.3 },
    { name: "Lechuga y pepino (ensalada)", qty: "1 unidad + 1 unidad", section: "Verduras y frutas", estCost: 0.7 },
    { name: "Aceite de oliva, comino, ajo", qty: "al gusto", section: "Grasas y condimentos", estCost: 0.5 },
  ],
  steps: [
    "Guisar las lentejas con cebolla, tomate, ajo y comino.",
    "Cocinar el arroz integral y el pollo en cubos aparte.",
    "Armar ensalada fresca de lechuga y pepino.",
    "Porcionar en 3 tarrinas.",
  ],
};

const cenaAtunCamote: Recipe = {
  id: "cena-atun-camote",
  name: "Atún sellado con camote asado y ensalada verde",
  mealType: "cena",
  prepMinutes: 25,
  batchCook: true,
  macros: { kcal: 900, protein: 62, carbs: 95, fat: 24 },
  servings: 2,
  ingredients: [
    { name: "Atún fresco o en agua", qty: "2 latas (170 g c/u)", section: "Proteínas", estCost: 3.6 },
    { name: "Camote", qty: "1.5 lb", section: "Verduras y frutas", estCost: 0.9 },
    { name: "Espinaca fresca", qty: "1 funda", section: "Verduras y frutas", estCost: 0.75 },
    { name: "Aguacate", qty: "1 unidad", section: "Verduras y frutas", estCost: 0.5 },
    { name: "Aceite de oliva y limón", qty: "2 cda + 1 unidad", section: "Grasas y condimentos", estCost: 0.5 },
  ],
  steps: [
    "Hornear el camote en cubos con aceite de oliva.",
    "Sellar el atún en sartén caliente 2 min por lado (o escurrir si es enlatado).",
    "Servir con espinaca fresca y aguacate en láminas.",
  ],
};

const cenaFrejolPollo: Recipe = {
  id: "cena-frejol-pollo",
  name: "Fréjol con pollo desmechado y aguacate",
  mealType: "cena",
  prepMinutes: 35,
  batchCook: true,
  macros: { kcal: 970, protein: 64, carbs: 115, fat: 26 },
  servings: 3,
  ingredients: [
    { name: "Fréjol (canario o rojo)", qty: "1.5 tazas (uncooked)", section: "Granos y legumbres", estCost: 2.0 },
    { name: "Pechuga de pollo", qty: "1.25 lb", section: "Proteínas", estCost: 4.0 },
    { name: "Arroz integral", qty: "1 taza (uncooked)", section: "Granos y legumbres", estCost: 1.2 },
    { name: "Cebolla, ajo, tomate", qty: "1 unidad c/u", section: "Verduras y frutas", estCost: 0.6 },
    { name: "Aguacate", qty: "1 unidad", section: "Verduras y frutas", estCost: 0.5 },
    { name: "Comino, achiote, sal", qty: "al gusto", section: "Grasas y condimentos", estCost: 0.3 },
  ],
  steps: [
    "Cocinar el fréjol con cebolla, ajo y comino hasta ablandar.",
    "Cocer y desmechar el pollo, integrarlo al guiso.",
    "Servir con arroz integral y aguacate.",
    "Porcionar en 3 tarrinas.",
  ],
};

const cenaResVerduras: Recipe = {
  id: "cena-res-saltado",
  name: "Salteado de res magra con verduras y arroz integral",
  mealType: "cena",
  prepMinutes: 25,
  batchCook: true,
  macros: { kcal: 960, protein: 63, carbs: 105, fat: 26 },
  servings: 2,
  ingredients: [
    { name: "Carne de res magra (lomo fino o posta)", qty: "1 lb", section: "Proteínas", estCost: 4.0 },
    { name: "Arroz integral", qty: "1 taza (uncooked)", section: "Granos y legumbres", estCost: 1.2 },
    { name: "Pimiento, cebolla, zanahoria", qty: "1 unidad c/u", section: "Verduras y frutas", estCost: 0.8 },
    { name: "Brócoli", qty: "0.5 lb", section: "Verduras y frutas", estCost: 0.45 },
    { name: "Aceite de coco o oliva", qty: "2 cda", section: "Grasas y condimentos", estCost: 0.5 },
    { name: "Salsa de soya (sin azúcar añadida) y ajo", qty: "al gusto", section: "Grasas y condimentos", estCost: 0.4 },
  ],
  steps: [
    "Cortar la carne en tiras y sellar a fuego alto.",
    "Saltear las verduras al wok manteniéndolas crocantes.",
    "Combinar con el arroz integral cocido.",
  ],
};

export const RECIPES = {
  desayunoBatido,
  desayunoTortilla,
  desayunoYogur,
  almuerzoQuinoaPollo,
  almuerzoAtunHuevo,
  cenaPolloHorno,
  cenaLentejas,
  cenaAtunCamote,
  cenaFrejolPollo,
  cenaResVerduras,
};

export const WEEK_PLAN: DayPlan[] = [
  {
    day: "lunes",
    label: "Lunes",
    breakfast: desayunoBatido,
    lunch: { type: "mama" },
    dinner: cenaPolloHorno,
    lucaJoins: false,
  },
  {
    day: "martes",
    label: "Martes",
    breakfast: desayunoTortilla,
    lunch: { type: "mama" },
    dinner: cenaPolloHorno,
    lucaJoins: true,
  },
  {
    day: "miercoles",
    label: "Miércoles",
    breakfast: desayunoYogur,
    lunch: { type: "mama" },
    dinner: cenaLentejas,
    lucaJoins: false,
  },
  {
    day: "jueves",
    label: "Jueves",
    breakfast: desayunoBatido,
    lunch: { type: "mama" },
    dinner: cenaAtunCamote,
    lucaJoins: false,
  },
  {
    day: "viernes",
    label: "Viernes",
    breakfast: desayunoTortilla,
    lunch: { type: "mama" },
    dinner: cenaFrejolPollo,
    lucaJoins: true,
  },
  {
    day: "sabado",
    label: "Sábado",
    breakfast: desayunoBatido,
    lunch: { type: "recipe", recipe: almuerzoQuinoaPollo },
    dinner: cenaResVerduras,
    lucaJoins: false,
  },
  {
    day: "domingo",
    label: "Domingo (día de compra y prep)",
    breakfast: desayunoYogur,
    lunch: { type: "recipe", recipe: almuerzoAtunHuevo },
    dinner: cenaLentejas,
    lucaJoins: false,
  },
];

export const LUCA_PORTION_FACTOR = 0.55; // porción infantil aproximada

export const DAY_ORDER: DayKey[] = [
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
  "domingo",
];
