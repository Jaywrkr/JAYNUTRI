import { Macros } from "./types";

export type FoodItem = {
  id: string;
  name: string;
  aliases: string[];
  unit: string;
  macros: Macros;
};

// Base de alimentos comunes precargada (sin melón, sin procesados, sin azúcar
// añadida — consistente con las restricciones del plan). Valores por la unidad
///porción indicada; sirven de estimado rápido para registrar algo que comiste
// fuera del plan.
export const FOOD_DB: FoodItem[] = [
  { id: "manzana", name: "Manzana", aliases: ["apple"], unit: "1 unidad mediana", macros: { kcal: 95, protein: 1, carbs: 25, fat: 0 } },
  { id: "platano", name: "Plátano (guineo)", aliases: ["banana", "guineo"], unit: "1 unidad mediana", macros: { kcal: 105, protein: 1, carbs: 27, fat: 0 } },
  { id: "naranja", name: "Naranja", aliases: [], unit: "1 unidad", macros: { kcal: 62, protein: 1, carbs: 15, fat: 0 } },
  { id: "mandarina", name: "Mandarina", aliases: [], unit: "1 unidad", macros: { kcal: 47, protein: 1, carbs: 12, fat: 0 } },
  { id: "papaya", name: "Papaya", aliases: [], unit: "1 taza picada", macros: { kcal: 62, protein: 1, carbs: 16, fat: 0 } },
  { id: "pina", name: "Piña", aliases: ["pina"], unit: "1 taza picada", macros: { kcal: 82, protein: 1, carbs: 22, fat: 0 } },
  { id: "fresas", name: "Fresas", aliases: ["frutilla", "frutillas"], unit: "1 taza", macros: { kcal: 49, protein: 1, carbs: 12, fat: 1 } },
  { id: "uvas", name: "Uvas", aliases: [], unit: "1 taza", macros: { kcal: 104, protein: 1, carbs: 27, fat: 0 } },
  { id: "pera", name: "Pera", aliases: [], unit: "1 unidad mediana", macros: { kcal: 101, protein: 1, carbs: 27, fat: 0 } },
  { id: "mango", name: "Mango", aliases: [], unit: "1 taza picado", macros: { kcal: 99, protein: 1, carbs: 25, fat: 1 } },
  { id: "sandia", name: "Sandía", aliases: [], unit: "1 taza picada", macros: { kcal: 46, protein: 1, carbs: 11, fat: 0 } },
  { id: "aguacate", name: "Aguacate", aliases: ["palta"], unit: "1/2 unidad", macros: { kcal: 120, protein: 1, carbs: 6, fat: 11 } },
  { id: "huevo", name: "Huevo cocido", aliases: ["huevo duro"], unit: "1 unidad", macros: { kcal: 78, protein: 6, carbs: 1, fat: 5 } },
  { id: "claras", name: "Claras de huevo", aliases: [], unit: "2 unidades", macros: { kcal: 34, protein: 7, carbs: 1, fat: 0 } },
  { id: "pollo", name: "Pechuga de pollo cocida", aliases: [], unit: "100 g", macros: { kcal: 165, protein: 31, carbs: 0, fat: 4 } },
  { id: "atun", name: "Atún en agua", aliases: [], unit: "1 lata escurrida", macros: { kcal: 128, protein: 28, carbs: 0, fat: 1 } },
  { id: "yogur", name: "Yogur griego natural", aliases: [], unit: "200 g", macros: { kcal: 130, protein: 20, carbs: 8, fat: 2 } },
  { id: "queso", name: "Queso fresco", aliases: [], unit: "1 rebanada (30 g)", macros: { kcal: 75, protein: 6, carbs: 1, fat: 5 } },
  { id: "mani", name: "Maní natural", aliases: ["mani"], unit: "1 puñado (30 g)", macros: { kcal: 170, protein: 7, carbs: 6, fat: 14 } },
  { id: "almendras", name: "Almendras", aliases: [], unit: "1 puñado (28 g)", macros: { kcal: 164, protein: 6, carbs: 6, fat: 14 } },
  { id: "pan-integral", name: "Pan integral", aliases: [], unit: "1 rebanada", macros: { kcal: 80, protein: 4, carbs: 14, fat: 1 } },
  { id: "tostadas-arroz", name: "Tostadas de arroz", aliases: [], unit: "2 unidades", macros: { kcal: 70, protein: 2, carbs: 15, fat: 1 } },
  { id: "avena", name: "Avena cocida", aliases: [], unit: "1 taza", macros: { kcal: 166, protein: 6, carbs: 28, fat: 4 } },
  { id: "arroz-integral", name: "Arroz integral cocido", aliases: [], unit: "1 taza", macros: { kcal: 216, protein: 5, carbs: 45, fat: 2 } },
  { id: "quinoa", name: "Quinoa cocida", aliases: [], unit: "1 taza", macros: { kcal: 222, protein: 8, carbs: 39, fat: 4 } },
  { id: "camote", name: "Camote cocido", aliases: [], unit: "1 unidad mediana", macros: { kcal: 103, protein: 2, carbs: 24, fat: 0 } },
  { id: "papa", name: "Papa cocida", aliases: [], unit: "1 unidad mediana", macros: { kcal: 161, protein: 4, carbs: 37, fat: 0 } },
  { id: "proteina-polvo", name: "Proteína en polvo (whey)", aliases: ["scoop de proteina"], unit: "1 scoop (30 g)", macros: { kcal: 120, protein: 24, carbs: 3, fat: 2 } },
  { id: "leche", name: "Leche deslactosada", aliases: [], unit: "1 vaso (250 ml)", macros: { kcal: 122, protein: 8, carbs: 12, fat: 5 } },
  { id: "cafe", name: "Café negro (sin azúcar)", aliases: [], unit: "1 taza", macros: { kcal: 2, protein: 0, carbs: 0, fat: 0 } },

  // Verduras
  { id: "brocoli", name: "Brócoli cocido", aliases: [], unit: "1 taza", macros: { kcal: 55, protein: 4, carbs: 11, fat: 1 } },
  { id: "espinaca", name: "Espinaca cocida", aliases: [], unit: "1 taza", macros: { kcal: 41, protein: 5, carbs: 7, fat: 1 } },
  { id: "zanahoria", name: "Zanahoria", aliases: [], unit: "1 unidad", macros: { kcal: 25, protein: 1, carbs: 6, fat: 0 } },
  { id: "tomate", name: "Tomate riñón", aliases: ["jitomate"], unit: "1 unidad", macros: { kcal: 22, protein: 1, carbs: 5, fat: 0 } },
  { id: "pepino", name: "Pepino", aliases: [], unit: "1 unidad", macros: { kcal: 45, protein: 2, carbs: 11, fat: 0 } },
  { id: "lechuga", name: "Lechuga", aliases: [], unit: "1 taza", macros: { kcal: 5, protein: 1, carbs: 1, fat: 0 } },
  { id: "pimiento", name: "Pimiento", aliases: ["pimenton"], unit: "1 unidad", macros: { kcal: 24, protein: 1, carbs: 6, fat: 0 } },
  { id: "cebolla", name: "Cebolla", aliases: [], unit: "1/2 unidad", macros: { kcal: 22, protein: 1, carbs: 5, fat: 0 } },
  { id: "coliflor", name: "Coliflor cocida", aliases: [], unit: "1 taza", macros: { kcal: 29, protein: 2, carbs: 5, fat: 0 } },
  { id: "champinones", name: "Champiñones", aliases: ["hongos"], unit: "1 taza", macros: { kcal: 15, protein: 2, carbs: 2, fat: 0 } },

  // Legumbres cocidas
  { id: "lentejas", name: "Lentejas cocidas", aliases: [], unit: "1 taza", macros: { kcal: 230, protein: 18, carbs: 40, fat: 1 } },
  { id: "frejol", name: "Fréjol cocido", aliases: ["frijol", "poroto"], unit: "1 taza", macros: { kcal: 245, protein: 15, carbs: 45, fat: 1 } },
  { id: "garbanzos", name: "Garbanzos cocidos", aliases: [], unit: "1 taza", macros: { kcal: 269, protein: 15, carbs: 45, fat: 4 } },
  { id: "habas", name: "Habas cocidas", aliases: [], unit: "1 taza", macros: { kcal: 187, protein: 13, carbs: 33, fat: 1 } },

  // Proteínas
  { id: "res", name: "Carne de res magra cocida", aliases: ["carne de res"], unit: "100 g", macros: { kcal: 205, protein: 27, carbs: 0, fat: 10 } },
  { id: "cerdo", name: "Lomo de cerdo cocido", aliases: ["chancho"], unit: "100 g", macros: { kcal: 180, protein: 26, carbs: 0, fat: 7 } },
  { id: "pescado", name: "Pescado blanco (tilapia/corvina)", aliases: ["tilapia", "corvina"], unit: "100 g", macros: { kcal: 128, protein: 26, carbs: 0, fat: 3 } },
  { id: "camaron", name: "Camarón cocido", aliases: [], unit: "100 g", macros: { kcal: 99, protein: 24, carbs: 0, fat: 0 } },
  { id: "pavo", name: "Pavo cocido", aliases: [], unit: "100 g", macros: { kcal: 135, protein: 25, carbs: 0, fat: 3 } },
  { id: "tofu", name: "Tofu", aliases: [], unit: "100 g", macros: { kcal: 76, protein: 8, carbs: 2, fat: 5 } },

  // Lácteos extra
  { id: "leche-entera", name: "Leche entera", aliases: [], unit: "1 vaso (250 ml)", macros: { kcal: 149, protein: 8, carbs: 12, fat: 8 } },
  { id: "requeson", name: "Requesón (cottage cheese)", aliases: [], unit: "1 taza", macros: { kcal: 206, protein: 28, carbs: 6, fat: 9 } },

  // Frutos secos y semillas
  { id: "nueces", name: "Nueces", aliases: [], unit: "1 puñado (28 g)", macros: { kcal: 185, protein: 4, carbs: 4, fat: 18 } },
  { id: "chia", name: "Semillas de chía", aliases: [], unit: "1 cda (15 g)", macros: { kcal: 69, protein: 2, carbs: 6, fat: 4 } },
  { id: "girasol", name: "Semillas de girasol", aliases: [], unit: "1 puñado (28 g)", macros: { kcal: 165, protein: 6, carbs: 6, fat: 14 } },
  { id: "coco", name: "Coco rallado", aliases: [], unit: "30 g", macros: { kcal: 100, protein: 1, carbs: 4, fat: 9 } },

  // Granos y tubérculos
  { id: "yuca", name: "Yuca cocida", aliases: ["mandioca"], unit: "1 taza", macros: { kcal: 191, protein: 2, carbs: 45, fat: 0 } },
  { id: "choclo", name: "Choclo (maíz) cocido", aliases: ["maiz", "elote"], unit: "1 unidad", macros: { kcal: 123, protein: 5, carbs: 27, fat: 2 } },
  { id: "melloco", name: "Melloco cocido", aliases: [], unit: "1 taza", macros: { kcal: 90, protein: 2, carbs: 20, fat: 0 } },

  // Grasas
  { id: "aceite-oliva", name: "Aceite de oliva", aliases: [], unit: "1 cda", macros: { kcal: 119, protein: 0, carbs: 0, fat: 14 } },

  // Frutas adicionales
  { id: "kiwi", name: "Kiwi", aliases: [], unit: "1 unidad", macros: { kcal: 42, protein: 1, carbs: 10, fat: 0 } },
  { id: "durazno", name: "Durazno", aliases: [], unit: "1 unidad", macros: { kcal: 59, protein: 1, carbs: 14, fat: 0 } },
  { id: "maracuya", name: "Maracuyá", aliases: [], unit: "1 unidad", macros: { kcal: 17, protein: 0, carbs: 4, fat: 0 } },
  { id: "taxo", name: "Taxo", aliases: [], unit: "1 unidad", macros: { kcal: 12, protein: 0, carbs: 3, fat: 0 } },
  { id: "mora", name: "Mora", aliases: [], unit: "1 taza", macros: { kcal: 62, protein: 2, carbs: 14, fat: 1 } },
  { id: "guanabana", name: "Guanábana", aliases: [], unit: "1 taza picada", macros: { kcal: 148, protein: 2, carbs: 38, fat: 1 } },
  { id: "granadilla", name: "Granadilla", aliases: [], unit: "1 unidad", macros: { kcal: 20, protein: 1, carbs: 5, fat: 0 } },
];

function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function searchFoods(query: string, limit = 6): FoodItem[] {
  const q = normalize(query);
  if (!q) return [];

  const scored = FOOD_DB.map((food) => {
    const haystacks = [normalize(food.name), ...food.aliases.map(normalize)];
    let score = -1;
    for (const h of haystacks) {
      if (h === q) score = Math.max(score, 100);
      else if (h.startsWith(q)) score = Math.max(score, 80);
      else if (h.includes(q)) score = Math.max(score, 50);
    }
    return { food, score };
  }).filter((s) => s.score > 0);

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.food);
}
