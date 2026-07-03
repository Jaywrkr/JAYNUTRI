"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion } from "motion/react";
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

const WIDTH = 320;
const CENTER = WIDTH / 2;
const BASELINE = 128;
// Radios de los arcos decorativos; PATH_R es el arco que el punto recorre
// de verdad, como un sol que sale por la izquierda, sube al mediodía, y se
// pone por la derecha a medida que se completa el objetivo del día.
const ARCS = [40, 62, 84, 106, 128, 150];
const PATH_R = 128;
const PATH_RY = PATH_R * 0.72;

function pointOnArc(t: number) {
  const angle = Math.PI * (1 - t); // 180° (izquierda) -> 0° (derecha)
  return {
    x: CENTER + PATH_R * Math.cos(angle),
    y: BASELINE - PATH_RY * Math.sin(angle),
  };
}

export default function HeroStat({ label, consumed, target, dayLabel }: Props) {
  // Objetivo obligatorio: hay que llegar al 100%, no un techo que no se debe cruzar.
  const remaining = Math.max(0, target.kcal - consumed.kcal);
  const pct = target.kcal > 0 ? consumed.kcal / target.kcal : 0;
  const done = pct >= 1;
  const displayValue = useCountUp(done ? consumed.kcal : remaining);

  const dot = pointOnArc(Math.min(1, pct));

  return (
    <div className="glass-card rounded-[28px] relative overflow-hidden min-h-[280px] flex flex-col justify-between">
      <div className="flex items-center justify-between pt-6 px-6">
        <p
          className="text-[11px] font-medium uppercase tracking-[0.15em]"
          style={{ color: "var(--text-muted)" }}
        >
          {label} · {dayLabel}
        </p>
        {done && (
          <span
            className="text-[11px] font-semibold uppercase tracking-wide rounded-full px-2.5 py-1 text-white"
            style={{ background: "var(--brand-gradient)" }}
          >
            ✓ cumplido
          </span>
        )}
      </div>

      <svg
        viewBox={`0 0 ${WIDTH} 170`}
        className="w-full h-[150px]"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden
      >
        <defs>
          <linearGradient id="heroDotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--macro-kcal)" />
            <stop offset="55%" stopColor="var(--macro-protein)" />
            <stop offset="100%" stopColor="var(--macro-carbs)" />
          </linearGradient>
        </defs>
        {ARCS.map((r, i) => (
          <path
            key={r}
            d={`M ${CENTER - r} ${BASELINE} A ${r} ${r * 0.72} 0 0 1 ${CENTER + r} ${BASELINE}`}
            fill="none"
            stroke={r === PATH_R ? "var(--macro-protein)" : "var(--text-muted)"}
            strokeWidth={r === PATH_R ? 1.5 : 1}
            opacity={r === PATH_R ? 0.55 : 0.1 + i * 0.05}
          />
        ))}
        <line
          x1="16"
          y1={BASELINE}
          x2={WIDTH - 16}
          y2={BASELINE}
          stroke="var(--border-hairline)"
          strokeWidth="1"
        />
        <motion.circle
          r="9"
          fill="url(#heroDotGradient)"
          initial={false}
          animate={{ cx: dot.x, cy: dot.y }}
          transition={{ type: "spring", stiffness: 90, damping: 16 }}
        />
      </svg>

      <div className="px-6 pb-6">
        <p className="text-4xl sm:text-5xl font-bold tracking-tight leading-none gradient-text tabular-nums">
          {displayValue}
        </p>
        <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
          {done
            ? `kcal de tu objetivo obligatorio de ${target.kcal} hoy`
            : `kcal que faltan para completar tu objetivo de ${target.kcal} hoy`}
        </p>
      </div>
    </div>
  );
}
