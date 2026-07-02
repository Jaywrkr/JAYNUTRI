"use client";

import { useEffect, useState } from "react";
import { WEEK_PLAN } from "@/lib/mealPlan";
import { buildShoppingList } from "@/lib/shoppingList";

export default function SundayBanner() {
  const [isSunday, setIsSunday] = useState(false);
  const [forcedOpen, setForcedOpen] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">(
    "default"
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from Date/Notification, not derivable during SSR
    setIsSunday(new Date().getDay() === 0);
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
    } else {
      setPermission("unsupported");
    }
  }, []);

  const visible = isSunday || forcedOpen;
  const { total } = buildShoppingList();

  const enableReminder = async () => {
    if (!("Notification" in window)) return;
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === "granted") {
      new Notification("JayNutri 🛒", {
        body: "Recordatorio activado: cada domingo verás aquí tu lista de compras y el plan de la semana entrante.",
      });
    }
  };

  if (!visible) {
    return (
      <button
        onClick={() => setForcedOpen(true)}
        className="text-xs font-medium hover:underline"
        style={{ color: "var(--text-secondary)" }}
      >
        Vista previa del recordatorio dominical
      </button>
    );
  }

  return (
    <div
      className="rounded-3xl p-5 sm:p-6 text-white relative overflow-hidden"
      style={{
        background:
          "linear-gradient(120deg, var(--macro-protein) 0%, var(--macro-kcal) 55%, var(--macro-carbs) 100%)",
      }}
    >
      <div className="flex items-start justify-between gap-3 flex-wrap relative">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            🔔 Recordatorio dominical{isSunday ? "" : " (vista previa)"}
          </h2>
          <p className="text-sm opacity-90 mt-1">
            Hoy toca la compra semanal — lista generada + resumen del plan de la semana
            entrante, estimado ${total.toFixed(2)}.
          </p>
        </div>
        {permission !== "unsupported" && permission !== "granted" && (
          <button
            onClick={enableReminder}
            className="rounded-full bg-white/20 backdrop-blur text-white text-xs font-medium px-3.5 py-1.5 border border-white/30 hover:bg-white/30 transition-colors"
          >
            Activar notificación en el navegador
          </button>
        )}
        {permission === "granted" && (
          <span className="text-xs opacity-90">Notificaciones activadas ✓</span>
        )}
      </div>

      <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm relative">
        {WEEK_PLAN.map((d) => (
          <li key={d.day}>
            <strong>{d.label}:</strong> {d.breakfast.name} ·{" "}
            {d.lunch.type === "recipe" ? d.lunch.recipe.name : "almuerzo en casa de mamá"} ·{" "}
            {d.dinner.name}
            {d.lucaJoins ? " (con Luca)" : ""}
          </li>
        ))}
      </ul>

      {!isSunday && (
        <button
          onClick={() => setForcedOpen(false)}
          className="mt-4 text-xs font-medium hover:underline relative"
        >
          Cerrar vista previa
        </button>
      )}
    </div>
  );
}
