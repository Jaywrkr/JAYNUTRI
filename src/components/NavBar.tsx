"use client";

import ThemeToggle from "./ThemeToggle";
import TextSizeControl from "./TextSizeControl";
import GlossaryPanel from "./GlossaryPanel";

type Props = {
  todayLabel: string;
};

export default function NavBar({ todayLabel }: Props) {
  return (
    <div
      className="sticky top-0 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 backdrop-blur-xl border-b"
      style={{
        borderColor: "var(--border-hairline)",
        background: "color-mix(in oklab, var(--background) 78%, transparent)",
      }}
    >
      <div className="mx-auto max-w-5xl w-full flex items-center justify-between py-3 gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="grid place-items-center h-9 w-9 rounded-xl text-base shrink-0"
            style={{ background: "var(--brand-gradient)" }}
          >
            🥗
          </span>
          <span className="font-semibold tracking-tight text-[15px] truncate">JayNutri</span>
          <span
            className="hidden sm:inline text-xs font-medium rounded-full px-3 py-1.5 shrink-0"
            style={{ background: "var(--surface-muted)", color: "var(--text-secondary)" }}
          >
            {todayLabel}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <TextSizeControl />
          <GlossaryPanel />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
