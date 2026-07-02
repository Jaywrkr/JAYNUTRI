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

const AMBER_BG = "linear-gradient(135deg, color-mix(in oklab, var(--macro-fat) 12%, var(--surface)), var(--surface))";
const AMBER_BORDER = "color-mix(in oklab, var(--macro-fat) 35%, transparent)";

export default function MomLunchLogger({ log, onSave, onClear }: Props) {
  const [description, setDescription] = useState(log?.description ?? "");
  const [portion, setPortion] = useState<MomLunchPortion>(log?.portion ?? "normal");
  const [editing, setEditing] = useState(!log);

  if (log && !editing) {
    return (
      <div
        className="rounded-2xl border p-3.5"
        style={{ background: AMBER_BG, borderColor: AMBER_BORDER }}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold" style={{ color: "var(--macro-fat)" }}>
              🍲 Almuerzo en casa de mamá — registrado
            </p>
            <p className="text-sm mt-0.5">{log.description || "(sin descripción)"}</p>
            <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
              Estimado ({log.portion}): {log.macros.kcal} kcal · P{log.macros.protein}g · C
              {log.macros.carbs}g · G{log.macros.fat}g
            </p>
          </div>
          <div className="flex flex-col gap-1 shrink-0 items-end">
            <button
              onClick={() => setEditing(true)}
              className="text-xs font-medium hover:underline"
              style={{ color: "var(--macro-protein)" }}
            >
              Editar
            </button>
            <button
              onClick={onClear}
              className="text-xs hover:underline"
              style={{ color: "var(--text-muted)" }}
            >
              Borrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border p-3.5" style={{ background: AMBER_BG, borderColor: AMBER_BORDER }}>
      <p className="text-xs font-semibold mb-2" style={{ color: "var(--macro-fat)" }}>
        🍲 Almuerzo entre semana en casa de mamá
      </p>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="¿Qué comiste, aunque no sea exacto? ej: seco de pollo con arroz y ensalada"
        className="w-full rounded-xl border px-3 py-2 text-sm mb-2 bg-transparent"
        style={{ borderColor: "var(--border-hairline)" }}
      />
      <div className="flex gap-2 flex-wrap mb-3">
        {PORTIONS.map((p) => (
          <button
            key={p.key}
            onClick={() => setPortion(p.key)}
            className="rounded-full px-3 py-1.5 text-xs transition-all"
            style={
              portion === p.key
                ? { background: "var(--macro-fat)", color: "white" }
                : { border: "1px solid var(--border-hairline)", color: "var(--text-secondary)" }
            }
          >
            {p.label} <span className="opacity-70">· {p.hint}</span>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          Estimado: {MOM_LUNCH_ESTIMATES[portion].kcal} kcal · P
          {MOM_LUNCH_ESTIMATES[portion].protein}g
        </p>
        <button
          onClick={() => {
            onSave({ description, portion, macros: MOM_LUNCH_ESTIMATES[portion] });
            setEditing(false);
          }}
          className="rounded-full text-white text-xs font-medium px-3.5 py-1.5"
          style={{ background: "linear-gradient(90deg, var(--macro-fat), var(--macro-fat-2))" }}
        >
          Registrar y ajustar el día
        </button>
      </div>
    </div>
  );
}
