"use client";

type Props = {
  streak: number;
};

export default function StreakBadge({ streak }: Props) {
  if (streak <= 0) return null;

  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1.5 shrink-0"
      style={{ background: "var(--brand-gradient)", color: "white" }}
    >
      🔥 {streak} {streak === 1 ? "día seguido" : "días seguidos"}
    </span>
  );
}
