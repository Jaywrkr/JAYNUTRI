"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "motion/react";
import { Macros } from "@/lib/types";

type Props = {
  label: string;
  consumed: Macros;
  target: Macros;
  dayLabel: string;
};

function useCountUp(value: number, duration = 1) {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const controls = animate(prev.current, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    prev.current = value;
    return () => controls.stop();
  }, [value, duration]);
  return display;
}

export default function HeroStat({ label, consumed, target, dayLabel }: Props) {
  const remaining = Math.max(0, target.kcal - consumed.kcal);
  const pct = target.kcal > 0 ? Math.min(1, consumed.kcal / target.kcal) : 0;
  const displayValue = useCountUp(remaining);

  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const [dash, setDash] = useState(circumference);

  useEffect(() => {
    const controls = animate(circumference, circumference * (1 - pct), {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDash(v),
    });
    return () => controls.stop();
  }, [pct, circumference]);

  return (
    <div className="glass-card rounded-[28px] p-6 sm:p-7 flex items-center gap-6 relative overflow-hidden">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-2xl pointer-events-none" style={{ background: "var(--brand-gradient)" }} />
      <div className="relative shrink-0">
        <svg width="152" height="152" viewBox="0 0 152 152" className="-rotate-90">
          <circle cx="76" cy="76" r={radius} fill="none" stroke="var(--surface-muted)" strokeWidth="12" />
          <circle
            cx="76"
            cy="76"
            r={radius}
            fill="none"
            stroke="url(#heroGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dash}
          />
          <defs>
            <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--macro-kcal)" />
              <stop offset="55%" stopColor="var(--macro-protein)" />
              <stop offset="100%" stopColor="var(--macro-carbs)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-2xl">🔥</span>
        </div>
      </div>
      <div className="relative min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
          {label} · {dayLabel}
        </p>
        <p className="text-5xl sm:text-6xl font-bold tracking-tight gradient-text tabular-nums leading-none mt-1">
          {displayValue}
        </p>
        <p className="text-sm mt-1.5" style={{ color: "var(--text-secondary)" }}>
          kcal restantes de {target.kcal}
        </p>
      </div>
    </div>
  );
}
