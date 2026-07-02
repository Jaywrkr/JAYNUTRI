"use client";

import { useEffect, useId, useRef, useState } from "react";

type Props = {
  title: string;
  children: string;
  className?: string;
};

export default function InfoTooltip({ title, children, className }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <span
      ref={ref}
      className={`relative inline-flex group ${className ?? ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-describedby={id}
        aria-label={`Qué significa ${title}`}
        className="grid place-items-center h-4 w-4 rounded-full text-[10px] font-semibold shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{
          background: "var(--surface-muted)",
          color: "var(--text-muted)",
          outlineColor: "var(--macro-protein)",
        }}
      >
        i
      </button>
      {open && (
        <span
          id={id}
          role="tooltip"
          className="absolute z-40 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-xl p-3 text-xs shadow-xl"
          style={{
            background: "var(--foreground)",
            color: "var(--background)",
          }}
        >
          <strong className="block mb-0.5">{title}</strong>
          {children}
        </span>
      )}
    </span>
  );
}
