import { WEEK_PLAN, LUCA_PORTION_FACTOR } from "./mealPlan";
import { Ingredient, Section } from "./types";

export type ShoppingItem = {
  name: string;
  section: Section;
  qtyNotes: string[];
  estCost: number;
};

const SECTION_ORDER: Section[] = [
  "Proteínas",
  "Verduras y frutas",
  "Granos y legumbres",
  "Lácteos y huevos",
  "Grasas y condimentos",
  "Otros",
];

export function buildShoppingList(): { items: ShoppingItem[]; total: number } {
  const map = new Map<string, ShoppingItem>();

  const addIngredient = (ing: Ingredient, extraForLuca: boolean) => {
    const cost = extraForLuca ? ing.estCost * LUCA_PORTION_FACTOR : ing.estCost;
    const existing = map.get(ing.name);
    const note = extraForLuca ? `${ing.qty} (+ porción Luca)` : ing.qty;
    if (existing) {
      existing.qtyNotes.push(note);
      existing.estCost += cost;
    } else {
      map.set(ing.name, {
        name: ing.name,
        section: ing.section,
        qtyNotes: [note],
        estCost: cost,
      });
    }
  };

  const dinnersAdded = new Set<string>();

  for (const day of WEEK_PLAN) {
    // Desayuno se prepara fresco cada día → se compra por cada ocurrencia
    day.breakfast.ingredients.forEach((i) => addIngredient(i, false));

    // Almuerzo solo se compra cuando se cocina en casa (sábado y domingo)
    if (day.lunch.type === "recipe") {
      day.lunch.recipe.ingredients.forEach((i) => addIngredient(i, false));
    }

    // Cena: batch cooking → el lote se compra una sola vez y rinde para
    // varios días (incluyendo sobras); se suma porción extra los días
    // en que Luca come con Jay.
    if (!dinnersAdded.has(day.dinner.id)) {
      day.dinner.ingredients.forEach((i) => addIngredient(i, false));
      dinnersAdded.add(day.dinner.id);
    }
    if (day.lucaJoins) {
      day.dinner.ingredients.forEach((i) => addIngredient(i, true));
    }
  }

  const items = Array.from(map.values()).sort((a, b) => {
    const sA = SECTION_ORDER.indexOf(a.section);
    const sB = SECTION_ORDER.indexOf(b.section);
    if (sA !== sB) return sA - sB;
    return a.name.localeCompare(b.name);
  });

  const total = items.reduce((sum, i) => sum + i.estCost, 0);

  return { items, total };
}

export function groupBySection(items: ShoppingItem[]): Record<string, ShoppingItem[]> {
  const groups: Record<string, ShoppingItem[]> = {};
  for (const item of items) {
    if (!groups[item.section]) groups[item.section] = [];
    groups[item.section].push(item);
  }
  return groups;
}
