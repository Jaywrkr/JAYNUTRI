"use client";

import { useState } from "react";
import { Macros, Recipe } from "@/lib/types";

type Props = {
  recipe: Recipe;
  eaten: boolean;
  onToggle: () => void;
  badge?: string;
  override?: Macros;
  onSaveOverride?: (macros: Macros) => void;
  onClearOverride?: () => void;
};

export default function RecipeCard({
  recipe,
  eaten,
  onToggle,
  badge,
  override,
  onSaveOverride,
  onClearOverride,
}: Props) {
  const [showSteps, setShowSteps] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Macros>(override ?? recipe.macros);

  const effective = override ?? recipe.macros;
  const editable = !!onSaveOverride;

  const startEdit = () => {
    setDraft(effective);
    setEditing(true);
  };

  const editField = (field: keyof Macros, value: number) => {
    setDraft((d) => ({ ...d, [field]: Math.max(0, value) }));
  };

  const save = () => {
    onSaveOverride?.(draft);
    setEditing(false);
  };

  return (
    <div
      className="rounded-2xl border p-3.5 transition-all"
      style={{
        borderColor: eaten ? "transparent" : "var(--border-hairline)",
        background: eaten
          ? "linear-gradient(135deg, color-mix(in oklab, var(--macro-protein) 14%, var(--surface)), var(--surface))"
          : "var(--surface)",
        boxShadow: eaten
          ? "0 0 0 1px color-mix(in oklab, var(--macro-protein) 35%, transparent)"
          : "none",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-medium">{recipe.name}</h4>
            {recipe.batchCook && (
              <span
                className="text-[10px] uppercase tracking-wide rounded-full px-2 py-0.5 font-medium"
                style={{
                  background: "color-mix(in oklab, var(--macro-kcal) 16%, transparent)",
                  color: "var(--macro-kcal)",
                }}
              >
                batch cooking
              </span>
            )}
            {badge && (
              <span
                className="text-[10px] uppercase tracking-wide rounded-full px-2 py-0.5 font-medium"
                style={{
                  background: "color-mix(in oklab, var(--macro-carbs) 16%, transparent)",
                  color: "var(--macro-carbs)",
                }}
              >
                {badge}
              </span>
            )}
            {override && (
              <span
                className="text-[10px] uppercase tracking-wide rounded-full px-2 py-0.5 font-medium"
                style={{ background: "color-mix(in oklab, var(--brand-accent) 16%, transparent)", color: "var(--brand-accent)" }}
              >
                editado
              </span>
            )}
          </div>
          <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
            ⏱ {recipe.prepMinutes} min · {effective.kcal} kcal · P{effective.protein}g · C
            {effective.carbs}g · G{effective.fat}g
          </p>
        </div>
        <button
          onClick={onToggle}
          className="shrink-0 text-xs font-medium rounded-full px-3 py-1.5 transition-all"
          style={
            eaten
              ? { background: "var(--macro-protein)", color: "white" }
              : { border: "1px solid var(--border-hairline)", color: "var(--text-secondary)" }
          }
        >
          {eaten ? "Comido ✓" : "Marcar comido"}
        </button>
      </div>

      <div className="flex items-center gap-3 mt-2 flex-wrap">
        <button
          onClick={() => setShowSteps((s) => !s)}
          className="text-xs font-medium hover:underline"
          style={{ color: "var(--macro-protein)" }}
        >
          {showSteps ? "Ocultar receta" : "Ver receta rápida"}
        </button>
        {editable && !editing && (
          <button
            onClick={startEdit}
            className="text-xs font-medium hover:underline"
            style={{ color: "var(--brand-accent)" }}
          >
            Editar macros
          </button>
        )}
        {override && !editing && (
          <button
            onClick={onClearOverride}
            className="text-xs hover:underline"
            style={{ color: "var(--text-muted)" }}
          >
            Restablecer
          </button>
        )}
      </div>

      {editing && (
        <div className="mt-3 rounded-xl p-3" style={{ background: "var(--surface-muted)" }}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <label className="flex flex-col gap-1">
              <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                Calorías
              </span>
              <input
                type="number"
                min={0}
                value={draft.kcal}
                onChange={(e) => editField("kcal", Number(e.target.value))}
                className="rounded-lg border px-2 py-1.5 text-sm bg-transparent"
                style={{ borderColor: "var(--border-hairline)" }}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                Proteína (g)
              </span>
              <input
                type="number"
                min={0}
                value={draft.protein}
                onChange={(e) => editField("protein", Number(e.target.value))}
                className="rounded-lg border px-2 py-1.5 text-sm bg-transparent"
                style={{ borderColor: "var(--border-hairline)" }}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                Carbs (g)
              </span>
              <input
                type="number"
                min={0}
                value={draft.carbs}
                onChange={(e) => editField("carbs", Number(e.target.value))}
                className="rounded-lg border px-2 py-1.5 text-sm bg-transparent"
                style={{ borderColor: "var(--border-hairline)" }}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                Grasa (g)
              </span>
              <input
                type="number"
                min={0}
                value={draft.fat}
                onChange={(e) => editField("fat", Number(e.target.value))}
                className="rounded-lg border px-2 py-1.5 text-sm bg-transparent"
                style={{ borderColor: "var(--border-hairline)" }}
              />
            </label>
          </div>
          <div className="flex items-center justify-end gap-3 mt-2">
            <button
              onClick={() => setEditing(false)}
              className="text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              Cancelar
            </button>
            <button
              onClick={save}
              className="rounded-full text-white text-xs font-medium px-3.5 py-1.5"
              style={{ background: "var(--brand-gradient)" }}
            >
              Guardar
            </button>
          </div>
        </div>
      )}

      {showSteps && (
        <div className="mt-3 space-y-3">
          <div>
            <p className="text-xs font-semibold mb-1" style={{ color: "var(--foreground)" }}>
              Ingredientes{" "}
              <span className="font-normal" style={{ color: "var(--text-muted)" }}>
                {recipe.servings > 1
                  ? `· receta completa, rinde ${recipe.servings} porciones`
                  : "· 1 porción"}
              </span>
            </p>
            <ul className="space-y-0.5 text-xs" style={{ color: "var(--text-secondary)" }}>
              {recipe.ingredients.map((ing) => (
                <li key={ing.name} className="flex justify-between gap-3">
                  <span>{ing.name}</span>
                  <span className="shrink-0 font-medium" style={{ color: "var(--foreground)" }}>
                    {ing.qty}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold mb-1" style={{ color: "var(--foreground)" }}>
              Preparación
            </p>
            <ol
              className="list-decimal list-inside space-y-1 text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              {recipe.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
