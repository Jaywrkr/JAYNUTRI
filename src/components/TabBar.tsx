"use client";

export type TabId = "hoy" | "semana" | "carrito" | "perfil";

const ITEMS: { id: TabId; label: string; icon: string }[] = [
  { id: "hoy", label: "Hoy", icon: "🔥" },
  { id: "semana", label: "Semana", icon: "📅" },
  { id: "carrito", label: "Carrito", icon: "🛒" },
  { id: "perfil", label: "Perfil", icon: "👤" },
];

type Props = {
  active: TabId;
  onChange: (tab: TabId) => void;
};

export default function TabBar({ active, onChange }: Props) {
  return (
    <nav
      className="no-print fixed bottom-4 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 rounded-full flex items-center justify-around gap-1 py-2 px-2 sm:px-3"
      style={{ background: "var(--brand-black)" }}
      aria-label="Navegación principal"
    >
      {ITEMS.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            aria-current={isActive ? "true" : undefined}
            className="flex flex-col items-center justify-center gap-0.5 h-12 w-14 sm:w-20 rounded-full text-base transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2"
            style={{ background: isActive ? "var(--brand-orange)" : "transparent" }}
          >
            <span className="leading-none" aria-hidden>
              {item.icon}
            </span>
            <span
              className="text-[9px] font-medium leading-none"
              style={{ color: isActive ? "white" : "rgba(255,255,255,0.55)" }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
