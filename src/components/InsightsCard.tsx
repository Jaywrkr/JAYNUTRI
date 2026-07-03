"use client";

import { useMemo, useState } from "react";
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

const CHART_W = 320;
const CHART_H = 130;
const PAD_TOP = 34;
const PAD_BOTTOM = 8;

function buildSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length - 1; i++) {
    const midX = (points[i].x + points[i + 1].x) / 2;
    const midY = (points[i].y + points[i + 1].y) / 2;
    d += ` Q ${points[i].x} ${points[i].y} ${midX} ${midY}`;
  }
  const last = points[points.length - 1];
  d += ` Q ${last.x} ${last.y} ${last.x} ${last.y}`;
  return d;
}

export default function InsightsCard({ weekData, weeklyConsumed, weeklyTarget, todayRows }: Props) {
  const [metric, setMetric] = useState<"kcal" | "protein">("kcal");
  const [spin, setSpin] = useState(0);

  const daysLogged = weekData.filter((d) => d.kcal > 0).length;

  const { linePath, areaPath, points, todayIdx } = useMemo(() => {
    const values = weekData.map((d) => d[metric]);
    const max = Math.max(1, ...values);
    const n = weekData.length;
    const xStep = CHART_W / (n - 1);
    const pts = values.map((v, i) => ({
      x: i * xStep,
      y: PAD_TOP + (1 - v / max) * (CHART_H - PAD_TOP - PAD_BOTTOM),
    }));
    const line = buildSmoothPath(pts);
    const area = `${line} L ${pts[n - 1].x} ${CHART_H} L ${pts[0].x} ${CHART_H} Z`;
    const idx = weekData.findIndex((d) => d.isToday);
    return { linePath: line, areaPath: area, points: pts, todayIdx: idx };
  }, [weekData, metric]);

  const todayPoint = todayIdx >= 0 ? points[todayIdx] : null;
  const todayValue = todayIdx >= 0 ? weekData[todayIdx][metric] : 0;

  return (
    <div className="glass-card rounded-[28px] overflow-hidden">
      <div className="p-5 sm:p-6 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid place-items-center h-8 w-8 rounded-xl text-base bg-[color-mix(in_oklab,var(--macro-protein)_18%,transparent)]">
              📊
            </span>
            <h2 className="text-lg font-semibold">Progreso</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSpin((s) => s + 1)}
              aria-label="Actualizar"
              className="grid place-items-center h-8 w-8 rounded-full"
              style={{ background: "var(--surface-muted)" }}
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
              style={{ background: "var(--surface-muted)" }}
            >
              ⚙
            </button>
          </div>
        </div>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
          {metric === "kcal" ? "Calorías por día" : "Proteína por día (g)"}
        </p>

        <div className="mt-4 relative">
          <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} className="w-full h-[130px]" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="color-mix(in oklab, var(--macro-protein) 35%, transparent)" />
                <stop offset="100%" stopColor="color-mix(in oklab, var(--macro-protein) 0%, transparent)" />
              </linearGradient>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--macro-kcal)" />
                <stop offset="50%" stopColor="var(--macro-protein)" />
                <stop offset="100%" stopColor="var(--macro-carbs)" />
              </linearGradient>
            </defs>
            <motion.path
              d={areaPath}
              fill="url(#areaFade)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.path
              d={linePath}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            {todayPoint && (
              <>
                <line
                  x1={todayPoint.x}
                  y1={todayPoint.y}
                  x2={todayPoint.x}
                  y2={CHART_H}
                  stroke="var(--macro-protein)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity={0.5}
                />
                <circle cx={todayPoint.x} cy={todayPoint.y} r="5" fill="var(--macro-protein)" />
                <circle cx={todayPoint.x} cy={todayPoint.y} r="8" fill="none" stroke="var(--macro-protein)" strokeWidth="1" opacity={0.4} />
              </>
            )}
          </svg>
          {todayPoint && (
            <div
              className="absolute text-[10px] font-medium rounded-full px-2 py-0.5 -translate-x-1/2 text-white"
              style={{
                left: `${(todayPoint.x / CHART_W) * 100}%`,
                top: 0,
                background: "var(--brand-gradient)",
              }}
            >
              hoy · {Math.round(todayValue)}
              {metric === "kcal" ? " kcal" : " g"}
            </div>
          )}
          <div className="flex justify-between mt-1">
            {weekData.map((d, i) => (
              <span
                key={i}
                className="text-[10px] flex-1 text-center"
                style={{ color: d.isToday ? "var(--foreground)" : "var(--text-muted)", fontWeight: d.isToday ? 700 : 400 }}
              >
                {d.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-t-[24px] px-5 sm:px-6 pt-5 pb-2" style={{ background: "var(--surface-muted)" }}>
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
