"use client";

import { useState } from "react";
import { MomLunchLog, MomLunchPortion } from "@/lib/types";
import { MOM_LUNCH_ESTIMATES } from "@/lib/nutrition";

type Props = {
  log?: MomLunchLog;
  onSave: (log: MomLunchLog) => void;
  onClear: () => void;
};

const PORTIONS: { key: MomLunchPortion; label: string; hint: string }[] = [
  { key: "liviano", label: "Liviano", hint: "sopa + poco seco" },
  { key: "normal", label: "Normal", hint: "plato tradicional" },
  { key: "abundante", label: "Abundante", hint: "plato grande / repetido" },
];

export default function MomLunchLogger({ log, onSave, onClear }: Props) {
  const [description, setDescription] = useState(log?.description ?? "");
  const [portion, setPortion] = useState<MomLunchPortion>(log?.portion ?? "normal");
  const [editing, setEditing] = useState(!log);

  if (log && !editing) {
    return (
      <div className="rounded-xl border border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40 p-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
              🍲 Almuerzo en casa de mamá — registrado
            </p>
            <p className="text-sm mt-0.5">{log.description || "(sin descripción)"}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Estimado ({log.portion}): {log.macros.kcal} kcal · P{log.macros.protein}g · C
              {log.macros.carbs}g · G{log.macros.fat}g
            </p>
          </div>
          <div className="flex flex-col gap-1 shrink-0">
            <button
              onClick={() => setEditing(true)}
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Editar
            </button>
            <button
              onClick={onClear}
              className="text-xs text-zinc-500 hover:underline"
            >
              Borrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-amber-300 dark:border-amber-800 p-3 bg-amber-50/50 dark:bg-amber-950/20">
      <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 mb-2">
        🍲 Almuerzo entre semana en casa de mamá
      </p>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="¿Qué comiste, aunque no sea exacto? ej: seco de pollo con arroz y ensalada"
        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-2 py-1.5 text-sm mb-2"
      />
      <div className="flex gap-2 flex-wrap mb-3">
        {PORTIONS.map((p) => (
          <button
            key={p.key}
            onClick={() => setPortion(p.key)}
            className={`rounded-full px-3 py-1 text-xs border ${
              portion === p.key
                ? "bg-amber-500 text-white border-amber-500"
                : "border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"
            }`}
          >
            {p.label} <span className="opacity-70">· {p.hint}</span>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Estimado: {MOM_LUNCH_ESTIMATES[portion].kcal} kcal · P
          {MOM_LUNCH_ESTIMATES[portion].protein}g
        </p>
        <button
          onClick={() => {
            onSave({ description, portion, macros: MOM_LUNCH_ESTIMATES[portion] });
            setEditing(false);
          }}
          className="rounded-full bg-amber-500 text-white text-xs font-medium px-3 py-1.5"
        >
          Registrar y ajustar el día
        </button>
      </div>
    </div>
  );
}
