"use client";

import { useState } from "react";
import { Recipe } from "@/lib/types";

type Props = {
  recipe: Recipe;
  eaten: boolean;
  onToggle: () => void;
  badge?: string;
};

export default function RecipeCard({ recipe, eaten, onToggle, badge }: Props) {
  const [showSteps, setShowSteps] = useState(false);

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
          </div>
          <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
            ⏱ {recipe.prepMinutes} min · {recipe.macros.kcal} kcal · P{recipe.macros.protein}g
            · C{recipe.macros.carbs}g · G{recipe.macros.fat}g
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

      <button
        onClick={() => setShowSteps((s) => !s)}
        className="mt-2 text-xs font-medium hover:underline"
        style={{ color: "var(--macro-protein)" }}
      >
        {showSteps ? "Ocultar receta" : "Ver receta rápida"}
      </button>

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
