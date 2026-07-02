"use client";

import { useMemo } from "react";
import { buildShoppingList, groupBySection } from "@/lib/shoppingList";

type Props = {
  budget: number;
  onBudgetChange: (n: number) => void;
};

export default function ShoppingCart({ budget, onBudgetChange }: Props) {
  const { items, total } = useMemo(() => buildShoppingList(), []);
  const groups = useMemo(() => groupBySection(items), [items]);
  const overBudget = total > budget;

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-lg font-semibold">🛒 Carrito inteligente — compra del domingo</h2>
        <div className="flex items-center gap-2 text-sm">
          <label className="text-zinc-500 dark:text-zinc-400">Presupuesto semanal</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => onBudgetChange(Number(e.target.value))}
            className="w-20 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-2 py-1"
          />
          <span>USD</span>
        </div>
      </div>

      <div
        className={`mt-3 rounded-xl px-4 py-3 flex items-center justify-between ${
          overBudget
            ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
            : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
        }`}
      >
        <span className="font-medium">Estimado total</span>
        <span className="text-lg font-semibold">${total.toFixed(2)}</span>
      </div>
      {overBudget && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
          Supera el presupuesto por ${(total - budget).toFixed(2)}. Considera reducir carne de
          res o comprar fréjol/lentejas en mayor cantidad en mercado local para bajar costo.
        </p>
      )}

      <div className="mt-4 space-y-4">
        {Object.entries(groups).map(([section, sectionItems]) => (
          <div key={section}>
            <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5">
              {section}
            </h3>
            <ul className="space-y-1">
              {sectionItems.map((item) => (
                <li
                  key={item.name}
                  className="flex items-start justify-between gap-3 text-sm border-b border-dashed border-zinc-200 dark:border-zinc-800 pb-1"
                >
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {" "}
                      — {item.qtyNotes.join(" + ")}
                    </span>
                  </div>
                  <span className="shrink-0 tabular-nums text-zinc-500 dark:text-zinc-400">
                    ${item.estCost.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
        Lista pensada para una sola compra semanal en Cuenca (mercados locales / tiendas de
        barrio), priorizando ingredientes frescos y de temporada. No incluye melón ni productos
        procesados o con azúcar añadida.
      </p>
    </div>
  );
}
