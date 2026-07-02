"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Macros } from "@/lib/types";

type DayBar = {
  label: string;
  kcal: number;
  protein: number;
  isToday: boolean;
};

type MealRow = {
  icon: string;
  iconBg: string;
  label: string;
  sublabel: string;
  kcal: number;
  eaten: boolean;
};

type Props = {
  weekData: DayBar[];
  weeklyConsumed: Macros;
  weeklyTarget: Macros;
  todayRows: MealRow[];
};

export default function InsightsCard({ weekData, weeklyConsumed, weeklyTarget, todayRows }: Props) {
  const [metric, setMetric] = useState<"kcal" | "protein">("kcal");
  const [spin, setSpin] = useState(0);

  const values = weekData.map((d) => d[metric]);
  const max = Math.max(1, ...values);

  const daysLogged = weekData.filter((d) => d.kcal > 0).length;

  return (
    <div className="green-card rounded-[32px] overflow-hidden">
      <div className="p-5 sm:p-6 pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Progreso</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSpin((s) => s + 1)}
              aria-label="Actualizar"
              className="grid place-items-center h-8 w-8 rounded-full"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <motion.span
                key={spin}
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-sm"
              >
                ⟳
              </motion.span>
            </button>
            <button
              onClick={() => setMetric((m) => (m === "kcal" ? "protein" : "kcal"))}
              aria-label="Cambiar métrica del gráfico"
              className="grid place-items-center h-8 w-8 rounded-full text-sm"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              ⚙
            </button>
          </div>
        </div>
        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
          {metric === "kcal" ? "Calorías por día" : "Proteína por día (g)"}
        </p>

        <div className="mt-6 flex items-end gap-2.5 h-28">
          {weekData.map((d, i) => {
            const v = d[metric];
            const heightPct = Math.max(4, (v / max) * 100);
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[10px] tabular-nums" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {Math.round(v)}
                </span>
                <motion.div
                  className="w-full rounded-t-md"
                  style={{ background: d.isToday ? "var(--brand-orange)" : "rgba(255,255,255,0.85)" }}
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPct}%` }}
                  transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                />
                <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {d.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-t-[28px] px-5 sm:px-6 pt-5 pb-2" style={{ background: "var(--surface)" }}>
        <div className="grid grid-cols-3 gap-2 pb-4">
          <Stat value={weeklyConsumed.kcal} label="kcal semana" />
          <Stat value={weeklyTarget.kcal} label="objetivo" />
          <Stat value={daysLogged} label="días con registro" />
        </div>

        <ul className="divide-y" style={{ borderColor: "var(--border-hairline)" }}>
          {todayRows.map((row, i) => (
            <li key={i} className="flex items-center gap-3 py-2.5">
              <span
                className="grid place-items-center h-9 w-9 rounded-full text-base shrink-0"
                style={{ background: row.iconBg }}
              >
                {row.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate" style={{ color: "var(--foreground)" }}>
                  {row.label}
                </p>
                <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                  {row.sublabel}
                </p>
              </div>
              <span
                className="text-sm font-medium tabular-nums shrink-0"
                style={{ color: row.eaten ? "var(--foreground)" : "var(--text-muted)" }}
              >
                {row.eaten ? `${row.kcal} kcal` : "—"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="text-lg font-bold tabular-nums leading-none" style={{ color: "var(--foreground)" }}>
        {Math.round(value)}
      </p>
      <p className="text-[11px] mt-1" style={{ color: "var(--text-muted)" }}>
        {label}
      </p>
    </div>
  );
}
