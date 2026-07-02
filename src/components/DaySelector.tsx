"use client";

import { motion } from "motion/react";
import { DAY_ORDER, WEEK_PLAN } from "@/lib/mealPlan";
import { DayKey } from "@/lib/types";
import { WeekLogs } from "@/lib/storage";

type Props = {
  activeDay: DayKey;
  onChange: (d: DayKey) => void;
  todayKey: DayKey;
  logs: WeekLogs;
};

export default function DaySelector({ activeDay, onChange, todayKey, logs }: Props) {
  const todayIdx = DAY_ORDER.indexOf(todayKey);

  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1 mb-4 -mx-1 px-1">
      {DAY_ORDER.map((d) => {
        const plan = WEEK_PLAN.find((p) => p.day === d)!;
        const active = activeDay === d;
        const idx = DAY_ORDER.indexOf(d);
        const isToday = d === todayKey;
        const isPast = idx < todayIdx;
        const log = logs[d];
        const isComplete = log.breakfastEaten && log.lunchEaten && log.dinnerEaten;

        return (
          <button
            key={d}
            onClick={() => onChange(d)}
            className="relative shrink-0 rounded-full px-4 py-2 text-sm font-medium flex items-center gap-1.5"
            style={{
              color: active ? "white" : "var(--text-secondary)",
              opacity: !active && isPast && !isComplete ? 0.55 : 1,
            }}
          >
            {active && (
              <motion.span
                layoutId="day-pill"
                className="absolute inset-0 rounded-full -z-10"
                style={{ background: "var(--brand-gradient)" }}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            {!active && (
              <span
                className="absolute inset-0 rounded-full -z-10"
                style={{ border: "1px solid var(--border-hairline)", background: "var(--surface)" }}
              />
            )}
            {plan.label.split(" ")[0]}
            {isComplete && <span aria-label="día completado">✓</span>}
            {isToday && !active && (
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--macro-fat)" }}
                aria-label="hoy"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
