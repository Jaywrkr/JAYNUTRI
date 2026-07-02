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
const ARCS = [40, 62, 84, 106, 128, 150];

export default function HeroStat({ label, consumed, target, dayLabel }: Props) {
  const remaining = Math.max(0, target.kcal - consumed.kcal);
  const pct = target.kcal > 0 ? Math.min(1, consumed.kcal / target.kcal) : 0;
  const displayValue = useCountUp(remaining);

  const dotX = 24 + pct * (WIDTH - 48);

  return (
    <div className="brand-card rounded-[32px] relative overflow-hidden min-h-[280px] flex flex-col justify-between">
      <p
        className="text-[11px] font-medium uppercase tracking-[0.15em] pt-6 px-6"
        style={{ color: "rgba(255,255,255,0.45)" }}
      >
        {label} · {dayLabel}
      </p>

      <svg
        viewBox={`0 0 ${WIDTH} 170`}
        className="w-full h-[150px]"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden
      >
        {ARCS.map((r, i) => (
          <path
            key={r}
            d={`M ${CENTER - r} ${BASELINE} A ${r} ${r * 0.72} 0 0 1 ${CENTER + r} ${BASELINE}`}
            fill="none"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="1"
            opacity={0.08 + i * 0.05}
          />
        ))}
        <line
          x1="16"
          y1={BASELINE}
          x2={WIDTH - 16}
          y2={BASELINE}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1"
        />
        <motion.circle
          cy={BASELINE}
          r="9"
          fill="var(--brand-orange)"
          initial={false}
          animate={{ cx: dotX }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        />
      </svg>

      <div className="px-6 pb-6">
        <p className="text-4xl sm:text-5xl font-bold tracking-tight leading-none text-white tabular-nums">
          {displayValue}
        </p>
        <p className="text-sm mt-2 lowercase" style={{ color: "rgba(255,255,255,0.6)" }}>
          kcal restantes de {target.kcal} hoy
        </p>
      </div>
    </div>
  );
}
