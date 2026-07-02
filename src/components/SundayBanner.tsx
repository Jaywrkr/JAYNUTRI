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
        className="text-xs text-zinc-500 dark:text-zinc-400 hover:underline"
      >
        Vista previa del recordatorio dominical
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 p-5">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200">
            🔔 Recordatorio dominical{isSunday ? "" : " (vista previa)"}
          </h2>
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            Hoy toca la compra semanal — lista generada + resumen del plan de la semana
            entrante, estimado ${total.toFixed(2)}.
          </p>
        </div>
        {permission !== "unsupported" && permission !== "granted" && (
          <button
            onClick={enableReminder}
            className="rounded-full bg-emerald-600 text-white text-xs font-medium px-3 py-1.5"
          >
            Activar notificación en el navegador
          </button>
        )}
        {permission === "granted" && (
          <span className="text-xs text-emerald-700 dark:text-emerald-300">
            Notificaciones activadas ✓
          </span>
        )}
      </div>

      <ul className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-emerald-900 dark:text-emerald-100">
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
          className="mt-3 text-xs text-emerald-700 dark:text-emerald-300 hover:underline"
        >
          Cerrar vista previa
        </button>
      )}
    </div>
  );
}
