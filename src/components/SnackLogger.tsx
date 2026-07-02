"use client";

import { useState } from "react";
import { FoodItem, searchFoods } from "@/lib/foods";
import { scaleMacros } from "@/lib/nutrition";
import { ExtraEntry } from "@/lib/types";

type Props = {
  extras: ExtraEntry[];
  onAdd: (entry: ExtraEntry) => void;
  onRemove: (id: string) => void;
};

export default function SnackLogger({ extras, onAdd, onRemove }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<FoodItem | null>(null);
  const [multiplier, setMultiplier] = useState(1);

  const results = selected ? [] : searchFoods(query);

  const pick = (food: FoodItem) => {
    setSelected(food);
    setQuery(food.name);
    setMultiplier(1);
  };

  const reset = () => {
    setSelected(null);
    setQuery("");
    setMultiplier(1);
  };

  const add = () => {
    if (!selected) return;
    onAdd({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: selected.name,
      qtyLabel: multiplier === 1 ? selected.unit : `${multiplier}× ${selected.unit}`,
      macros: scaleMacros(selected.macros, multiplier),
    });
    reset();
  };

  return (
    <div className="rounded-2xl border p-3.5" style={{ borderColor: "var(--border-hairline)" }}>
      <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
        🍎 ¿Comiste algo extra? Regístralo aquí
      </p>

      <div className="relative">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (selected) setSelected(null);
          }}
          placeholder="ej: manzana, huevo, yogur…"
          className="w-full rounded-xl border px-3 py-2 text-sm bg-transparent"
          style={{ borderColor: "var(--border-hairline)" }}
        />
        {!selected && results.length > 0 && (
          <ul
            className="absolute z-20 mt-1 w-full rounded-xl border shadow-lg overflow-hidden"
            style={{ background: "var(--surface)", borderColor: "var(--border-hairline)" }}
          >
            {results.map((food) => (
              <li key={food.id}>
                <button
                  onClick={() => pick(food)}
                  className="w-full text-left px-3 py-2 text-sm flex items-center justify-between gap-2 hover:opacity-80"
                >
                  <span>{food.name}</span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {food.macros.kcal} kcal · {food.unit}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selected && (
        <div className="mt-2 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setMultiplier((m) => Math.max(0.5, m - 0.5))}
              className="grid place-items-center h-7 w-7 rounded-full text-sm font-semibold"
              style={{ background: "var(--surface-muted)" }}
              aria-label="Reducir cantidad"
            >
              −
            </button>
            <span className="text-sm w-14 text-center tabular-nums">
              {multiplier}× {selected.unit}
            </span>
            <button
              onClick={() => setMultiplier((m) => m + 0.5)}
              className="grid place-items-center h-7 w-7 rounded-full text-sm font-semibold"
              style={{ background: "var(--surface-muted)" }}
              aria-label="Aumentar cantidad"
            >
              +
            </button>
            <span className="text-xs ml-1" style={{ color: "var(--text-muted)" }}>
              ≈ {Math.round(selected.macros.kcal * multiplier)} kcal · P
              {Math.round(selected.macros.protein * multiplier)}g
            </span>
          </div>
          <div className="flex gap-2">
            <button onClick={reset} className="text-xs" style={{ color: "var(--text-muted)" }}>
              Cancelar
            </button>
            <button
              onClick={add}
              className="rounded-full text-xs font-medium px-3.5 py-1.5 text-white"
              style={{ background: "var(--brand-gradient)" }}
            >
              Agregar
            </button>
          </div>
        </div>
      )}

      {!selected && query && results.length === 0 && (
        <p className="mt-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
          No encontré &quot;{query}&quot; en la base — probá con otro nombre (ej: manzana, huevo,
          pollo, lentejas).
        </p>
      )}

      {extras.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {extras.map((extra) => (
            <li
              key={extra.id}
              className="flex items-center justify-between gap-2 text-sm rounded-xl px-3 py-1.5"
              style={{ background: "var(--surface-muted)" }}
            >
              <span>
                {extra.name} <span style={{ color: "var(--text-muted)" }}>· {extra.qtyLabel}</span>
              </span>
              <span className="flex items-center gap-2 shrink-0">
                <span className="text-xs tabular-nums" style={{ color: "var(--text-secondary)" }}>
                  {extra.macros.kcal} kcal
                </span>
                <button
                  onClick={() => onRemove(extra.id)}
                  aria-label={`Quitar ${extra.name}`}
                  className="text-xs"
                  style={{ color: "var(--macro-fat)" }}
                >
                  ✕
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
