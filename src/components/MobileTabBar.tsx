"use client";

import { useEffect, useState } from "react";

const ITEMS = [
  { href: "#hoy", label: "Hoy", icon: "🔥" },
  { href: "#semana", label: "Semana", icon: "📅" },
  { href: "#carrito", label: "Carrito", icon: "🛒" },
];

export default function MobileTabBar() {
  const [active, setActive] = useState("#hoy");

  useEffect(() => {
    const sections = ITEMS.map((i) => document.getElementById(i.href.slice(1))).filter(
      (el): el is HTMLElement => !!el
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="no-print sm:hidden fixed bottom-4 inset-x-4 z-40 rounded-full flex items-center justify-around py-2 px-2"
      style={{ background: "var(--brand-black)" }}
      aria-label="Navegación principal"
    >
      {ITEMS.map((item) => {
        const isActive = active === item.href;
        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={isActive ? "true" : undefined}
            className="flex flex-col items-center justify-center gap-0.5 h-12 w-12 rounded-full text-base transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2"
            style={{
              background: isActive ? "var(--brand-orange)" : "transparent",
            }}
          >
            <span className="leading-none" aria-hidden>
              {item.icon}
            </span>
            <span className="sr-only">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
