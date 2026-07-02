"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  title: string;
  children: string;
  className?: string;
};

const WIDTH = 224; // px, matches w-56
const MARGIN = 8;

export default function InfoTooltip({ title, children, className }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, flip: false });
  const btnRef = useRef<HTMLButtonElement>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const id = useId();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time mount flag to gate document.body portal, not derivable during SSR
    setMounted(true);
  }, []);

  const computePosition = () => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const spaceAbove = rect.top;
    const flip = spaceAbove < 140; // not enough room above -> show below instead
    let left = rect.left + rect.width / 2 - WIDTH / 2;
    left = Math.max(MARGIN, Math.min(left, window.innerWidth - WIDTH - MARGIN));
    const top = flip ? rect.bottom + MARGIN : rect.top - MARGIN;
    setPos({ top, left, flip });
  };

  useEffect(() => {
    if (!open) return;
    computePosition();
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onReposition = () => computePosition();
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onReposition, true);
    window.addEventListener("resize", onReposition);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onReposition, true);
      window.removeEventListener("resize", onReposition);
    };
  }, [open]);

  return (
    <span ref={wrapRef} className={`relative inline-flex ${className ?? ""}`}>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen(true)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
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
      {mounted &&
        open &&
        createPortal(
          <span
            id={id}
            role="tooltip"
            className="fixed z-50 rounded-xl p-3 text-xs shadow-xl"
            style={{
              top: pos.top,
              left: pos.left,
              width: WIDTH,
              transform: pos.flip ? "translateY(0)" : "translateY(-100%)",
              background: "var(--foreground)",
              color: "var(--background)",
            }}
          >
            <strong className="block mb-0.5">{title}</strong>
            {children}
          </span>,
          document.body
        )}
    </span>
  );
}
