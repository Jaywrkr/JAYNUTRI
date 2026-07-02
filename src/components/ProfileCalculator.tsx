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
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Perfil y objetivo calórico</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            36 años · 160 lb · 175 cm · kettlebell + Muay Thai + yoga (5x/semana)
          </p>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          {open ? "Ocultar" : "Editar datos"}
        </button>
      </div>

      {open && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <label className="flex flex-col gap-1">
            Peso (kg)
            <input
              type="number"
              value={profile.weightKg}
              onChange={(e) => update({ weightKg: Number(e.target.value) })}
              className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-2 py-1"
            />
          </label>
          <label className="flex flex-col gap-1">
            Altura (cm)
            <input
              type="number"
              value={profile.heightCm}
              onChange={(e) => update({ heightCm: Number(e.target.value) })}
              className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-2 py-1"
            />
          </label>
          <label className="flex flex-col gap-1">
            Edad
            <input
              type="number"
              value={profile.age}
              onChange={(e) => update({ age: Number(e.target.value) })}
              className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-2 py-1"
            />
          </label>
          <label className="flex flex-col gap-1">
            Entrenos/semana
            <input
              type="number"
              value={profile.trainingDaysPerWeek}
              onChange={(e) => update({ trainingDaysPerWeek: Number(e.target.value) })}
              className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-2 py-1"
            />
          </label>
          <label className="flex flex-col gap-1 col-span-2 sm:col-span-4">
            Déficit calórico ({profile.deficitPct}%)
            <input
              type="range"
              min={5}
              max={25}
              value={profile.deficitPct}
              onChange={(e) => update({ deficitPct: Number(e.target.value) })}
            />
          </label>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-3">
        <Stat label="BMR" value={`${bmr} kcal`} />
        <Stat label="TDEE" value={`${tdee} kcal`} />
        <Stat label="Objetivo diario" value={`${macros.kcal} kcal`} highlight />
        <Stat label="Proteína" value={`${macros.protein} g`} highlight />
        <Stat label="Carbs / Grasa" value={`${macros.carbs} g / ${macros.fat} g`} />
      </div>
      <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
        Cálculo con fórmula Mifflin-St Jeor + factor de actividad, y déficit moderado para
        perder grasa abdominal preservando masa muscular (proteína alta, ~2 g/kg).
      </p>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={`rounded-xl px-3 py-2 ${
        highlight
          ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
      }`}
    >
      <div className="text-xs">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
