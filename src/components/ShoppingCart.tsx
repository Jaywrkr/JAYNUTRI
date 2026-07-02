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
    <div className="glass-card rounded-[28px] p-5 sm:p-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="grid place-items-center h-8 w-8 rounded-xl text-base bg-[color-mix(in_oklab,var(--macro-fat)_18%,transparent)]">
            🛒
          </span>
          <h2 className="text-lg font-semibold">Carrito inteligente — compra del domingo</h2>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <label style={{ color: "var(--text-secondary)" }}>Presupuesto semanal</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => onBudgetChange(Number(e.target.value))}
            className="w-20 rounded-xl border px-2.5 py-1.5 bg-transparent"
            style={{ borderColor: "var(--border-hairline)" }}
          />
          <span>USD</span>
        </div>
      </div>

      <div
        className="mt-4 rounded-2xl px-4 py-3.5 flex items-center justify-between text-white"
        style={{
          background: overBudget
            ? "linear-gradient(90deg, #d03b3b, #ec835a)"
            : "linear-gradient(90deg, var(--macro-protein), var(--macro-protein-2))",
        }}
      >
        <span className="font-medium">Estimado total</span>
        <span className="text-lg font-semibold">${total.toFixed(2)}</span>
      </div>
      {overBudget && (
        <p className="mt-2 text-xs" style={{ color: "#d03b3b" }}>
          Supera el presupuesto por ${(total - budget).toFixed(2)}. Considera reducir carne de
          res o comprar fréjol/lentejas en mayor cantidad en mercado local para bajar costo.
        </p>
      )}

      <div className="mt-5 space-y-5">
        {Object.entries(groups).map(([section, sectionItems]) => (
          <div key={section}>
            <h3
              className="text-sm font-semibold mb-2 uppercase tracking-wide text-[11px]"
              style={{ color: "var(--text-muted)" }}
            >
              {section}
            </h3>
            <ul className="space-y-1.5">
              {sectionItems.map((item) => (
                <li
                  key={item.name}
                  className="flex items-start justify-between gap-3 text-sm border-b pb-1.5"
                  style={{ borderColor: "var(--border-hairline)", borderStyle: "dashed" }}
                >
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span style={{ color: "var(--text-secondary)" }}> — {item.qtyNotes.join(" + ")}</span>
                  </div>
                  <span
                    className="shrink-0 tabular-nums"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    ${item.estCost.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs" style={{ color: "var(--text-muted)" }}>
        Lista pensada para una sola compra semanal en Cuenca (mercados locales / tiendas de
        barrio), priorizando ingredientes frescos y de temporada. No incluye melón ni productos
        procesados o con azúcar añadida.
      </p>
    </div>
  );
}
