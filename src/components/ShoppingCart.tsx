"use client";

import { useMemo, useState } from "react";
import { buildShoppingList, groupBySection, ShoppingItem } from "@/lib/shoppingList";
import { useToast } from "./Toast";

type Props = {
  budget: number;
  onBudgetChange: (n: number) => void;
};

function formatListAsText(groups: Record<string, ShoppingItem[]>, total: number): string {
  const lines = ["🛒 Lista de compras JayNutri", ""];
  for (const [section, items] of Object.entries(groups)) {
    lines.push(`— ${section} —`);
    for (const item of items) {
      lines.push(`• ${item.name} (${item.qtyNotes.join(" + ")}) — $${item.estCost.toFixed(2)}`);
    }
    lines.push("");
  }
  lines.push(`Total estimado: $${total.toFixed(2)}`);
  return lines.join("\n");
}

export default function ShoppingCart({ budget, onBudgetChange }: Props) {
  const { items, total } = useMemo(() => buildShoppingList(), []);
  const groups = useMemo(() => groupBySection(items), [items]);
  const overBudget = total > budget;
  const { showToast } = useToast();

  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const toggleSection = (section: string) =>
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));

  const handleShare = async () => {
    const text = formatListAsText(groups, total);
    if (navigator.share) {
      try {
        await navigator.share({ title: "Lista de compras JayNutri", text });
        return;
      } catch {
        /* user cancelled or unsupported, fall through to clipboard */
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      showToast("Lista copiada al portapapeles");
    } catch {
      showToast("No se pudo compartir la lista");
    }
  };

  return (
    <div id="carrito" className="glass-card rounded-[28px] p-5 sm:p-6 scroll-mt-20">
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

      <div className="no-print flex gap-2 mt-4">
        <button
          onClick={handleShare}
          className="flex-1 rounded-full text-sm font-medium px-4 py-2 transition-opacity hover:opacity-85"
          style={{ background: "var(--brand-gradient)", color: "white" }}
        >
          Compartir lista
        </button>
        <button
          onClick={() => window.print()}
          className="rounded-full text-sm font-medium px-4 py-2"
          style={{ border: "1px solid var(--border-hairline)", color: "var(--text-secondary)" }}
        >
          Imprimir
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {Object.entries(groups).map(([section, sectionItems]) => {
          const isCollapsed = collapsed[section];
          return (
            <div key={section} className="rounded-2xl" style={{ background: "var(--surface-muted)" }}>
              <button
                onClick={() => toggleSection(section)}
                className="w-full flex items-center justify-between px-3.5 py-2.5"
                aria-expanded={!isCollapsed}
              >
                <span
                  className="text-sm font-semibold uppercase tracking-wide text-[11px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {section} · {sectionItems.length}
                </span>
                <span
                  className="text-xs transition-transform"
                  style={{ transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)" }}
                >
                  ▾
                </span>
              </button>
              {!isCollapsed && (
                <ul className="space-y-1.5 px-3.5 pb-3.5">
                  {sectionItems.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-start justify-between gap-3 text-sm border-b pb-1.5"
                      style={{ borderColor: "var(--border-hairline)", borderStyle: "dashed" }}
                    >
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span style={{ color: "var(--text-secondary)" }}>
                          {" "}
                          — {item.qtyNotes.join(" + ")}
                        </span>
                      </div>
                      <span className="shrink-0 tabular-nums" style={{ color: "var(--text-secondary)" }}>
                        ${item.estCost.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-xs" style={{ color: "var(--text-muted)" }}>
        Lista pensada para una sola compra semanal en Cuenca (mercados locales / tiendas de
        barrio), priorizando ingredientes frescos y de temporada. No incluye melón ni productos
        procesados o con azúcar añadida.
      </p>
    </div>
  );
}
