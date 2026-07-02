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
      className={`rounded-xl border p-3 transition-colors ${
        eaten
          ? "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40"
          : "border-zinc-200 dark:border-zinc-800"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-medium">{recipe.name}</h4>
            {recipe.batchCook && (
              <span className="text-[10px] uppercase tracking-wide bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 rounded-full px-2 py-0.5">
                batch cooking
              </span>
            )}
            {badge && (
              <span className="text-[10px] uppercase tracking-wide bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300 rounded-full px-2 py-0.5">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            ⏱ {recipe.prepMinutes} min · {recipe.macros.kcal} kcal · P{recipe.macros.protein}g
            · C{recipe.macros.carbs}g · G{recipe.macros.fat}g
          </p>
        </div>
        <button
          onClick={onToggle}
          className={`shrink-0 text-xs font-medium rounded-full px-3 py-1 border ${
            eaten
              ? "bg-emerald-600 text-white border-emerald-600"
              : "border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"
          }`}
        >
          {eaten ? "Comido ✓" : "Marcar comido"}
        </button>
      </div>

      <button
        onClick={() => setShowSteps((s) => !s)}
        className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
      >
        {showSteps ? "Ocultar receta" : "Ver receta rápida"}
      </button>

      {showSteps && (
        <ol className="mt-2 list-decimal list-inside space-y-1 text-xs text-zinc-600 dark:text-zinc-300">
          {recipe.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      )}
    </div>
  );
}
