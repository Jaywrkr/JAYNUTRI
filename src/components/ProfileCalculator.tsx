"use client";

import { useState } from "react";
import { Profile } from "@/lib/types";
import { calcTargets } from "@/lib/nutrition";

type Props = {
  profile: Profile;
  onChange: (p: Profile) => void;
};

export default function ProfileCalculator({ profile, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const { bmr, tdee, macros } = calcTargets(profile);

  const update = (patch: Partial<Profile>) => onChange({ ...profile, ...patch });

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Perfil y objetivo calórico</h2>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
            36 años · 160 lb · 175 cm · kettlebell + Muay Thai + yoga (5x/semana)
          </p>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="shrink-0 text-sm font-medium rounded-full px-3.5 py-1.5 transition-opacity hover:opacity-80"
          style={{ background: "var(--brand-gradient)", color: "white" }}
        >
          {open ? "Ocultar" : "Editar datos"}
        </button>
      </div>

      {open && (
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <label className="flex flex-col gap-1.5">
            <span style={{ color: "var(--text-secondary)" }}>Peso (kg)</span>
            <input
              type="number"
              value={profile.weightKg}
              onChange={(e) => update({ weightKg: Number(e.target.value) })}
              className="rounded-xl border px-3 py-1.5 bg-transparent"
              style={{ borderColor: "var(--border-hairline)" }}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span style={{ color: "var(--text-secondary)" }}>Altura (cm)</span>
            <input
              type="number"
              value={profile.heightCm}
              onChange={(e) => update({ heightCm: Number(e.target.value) })}
              className="rounded-xl border px-3 py-1.5 bg-transparent"
              style={{ borderColor: "var(--border-hairline)" }}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span style={{ color: "var(--text-secondary)" }}>Edad</span>
            <input
              type="number"
              value={profile.age}
              onChange={(e) => update({ age: Number(e.target.value) })}
              className="rounded-xl border px-3 py-1.5 bg-transparent"
              style={{ borderColor: "var(--border-hairline)" }}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span style={{ color: "var(--text-secondary)" }}>Entrenos/semana</span>
            <input
              type="number"
              value={profile.trainingDaysPerWeek}
              onChange={(e) => update({ trainingDaysPerWeek: Number(e.target.value) })}
              className="rounded-xl border px-3 py-1.5 bg-transparent"
              style={{ borderColor: "var(--border-hairline)" }}
            />
          </label>
          <label className="flex flex-col gap-1.5 col-span-2 sm:col-span-4">
            <span style={{ color: "var(--text-secondary)" }}>
              Déficit calórico ({profile.deficitPct}%)
            </span>
            <input
              type="range"
              min={5}
              max={25}
              value={profile.deficitPct}
              onChange={(e) => update({ deficitPct: Number(e.target.value) })}
              className="accent-[var(--macro-protein)]"
            />
          </label>
        </div>
      )}

      <div className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-3">
        <Stat label="BMR" value={`${bmr} kcal`} />
        <Stat label="TDEE" value={`${tdee} kcal`} />
        <Stat label="Objetivo diario" value={`${macros.kcal} kcal`} accent="kcal" />
        <Stat label="Proteína" value={`${macros.protein} g`} accent="protein" />
        <Stat label="Carbs / Grasa" value={`${macros.carbs} g / ${macros.fat} g`} accent="carbs" />
      </div>
      <p className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
        Cálculo con fórmula Mifflin-St Jeor + factor de actividad, y déficit moderado para
        perder grasa abdominal preservando masa muscular (proteína alta, ~2 g/kg).
      </p>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "kcal" | "protein" | "carbs";
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl px-3.5 py-3"
      style={{
        background: accent
          ? `linear-gradient(140deg, color-mix(in oklab, var(--macro-${accent}) 16%, var(--surface-muted)), var(--surface-muted))`
          : "var(--surface-muted)",
      }}
    >
      <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
        {label}
      </div>
      <div className="font-semibold text-[15px] mt-0.5">{value}</div>
    </div>
  );
}
