"use client";

const ITEMS = [
  { href: "#hoy", label: "Hoy", icon: "🔥" },
  { href: "#semana", label: "Semana", icon: "📅" },
  { href: "#carrito", label: "Carrito", icon: "🛒" },
];

export default function MobileTabBar() {
  return (
    <nav
      className="no-print sm:hidden fixed bottom-0 inset-x-0 z-40 backdrop-blur-xl border-t flex items-stretch"
      style={{
        borderColor: "var(--border-hairline)",
        background: "color-mix(in oklab, var(--background) 90%, transparent)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      aria-label="Navegación principal"
    >
      {ITEMS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-medium focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2"
          style={{ color: "var(--text-secondary)" }}
        >
          <span className="text-base leading-none">{item.icon}</span>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
