"use client";

import { useEffect, useState } from "react";

type Props = {
  label: string;
  current: number;
  target: number;
  unit: string;
  color: string;
};

export default function MacroBar({ label, current, target, unit, color }: Props) {
  const [width, setWidth] = useState(0);
  const pct = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;

  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 80);
    return () => clearTimeout(t);
  }, [pct]);

  const over = current > target;

  return (
    <div>
      <div className="flex items-baseline justify-between text-sm mb-1">
        <span className="font-medium text-zinc-700 dark:text-zinc-200">{label}</span>
        <span className="text-zinc-500 dark:text-zinc-400 tabular-nums">
          {Math.round(current)} / {Math.round(target)} {unit}
          <span className="ml-1 text-xs">({pct}%)</span>
        </span>
      </div>
      <div className="h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
        <div
          className={`h-full rounded-full transition-[width] duration-1000 ease-out ${
            over ? "bg-amber-500" : color
          }`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
