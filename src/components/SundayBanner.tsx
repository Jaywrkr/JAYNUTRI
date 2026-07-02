"use client";

import { useEffect, useState } from "react";
import { SUNDAY_PREP_CHECKLIST, WEEK_PLAN } from "@/lib/mealPlan";
import { buildShoppingList } from "@/lib/shoppingList";

const CHECKLIST_KEY = "jaynutri:sunday-prep:v1";

export default function SundayBanner() {
  const [isSunday, setIsSunday] = useState(false);
  const [forcedOpen, setForcedOpen] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">(
    "default"
  );
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from Date/Notification/localStorage, not derivable during SSR
    setIsSunday(new Date().getDay() === 0);
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
    } else {
      setPermission("unsupported");
    }
    try {
      const raw = window.localStorage.getItem(CHECKLIST_KEY);
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const toggleItem = (i: number) => {
    setChecked((prev) => {
      const next = { ...prev, [i]: !prev[i] };
      window.localStorage.setItem(CHECKLIST_KEY, JSON.stringify(next));
      return next;
    });
  };

  const visible = isSunday || forcedOpen;
  const { total } = buildShoppingList();
  const doneCount = SUNDAY_PREP_CHECKLIST.filter((_, i) => checked[i]).length;

  const enableReminder = async () => {
    if (!("Notification" in window)) return;
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === "granted") {
      new Notification("JayNutri 🛒", {
        body: "Recordatorio activado: cada domingo verás aquí tu lista de compras, tu checklist de batch cooking, y el plan de la semana entrante.",
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
      className="rounded-[28px] p-5 sm:p-6 text-white relative overflow-hidden"
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
            Hoy toca compra + batch cooking + congelar fruta — lista generada, estimado $
            {total.toFixed(2)}, y el plan de la semana entrante.
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

      <div className="mt-4 rounded-2xl bg-white/12 backdrop-blur p-4 relative border border-white/20">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold uppercase tracking-wide opacity-90">
            🧊 Checklist de batch cooking y congelado
          </p>
          <span className="text-xs opacity-80 tabular-nums">
            {doneCount}/{SUNDAY_PREP_CHECKLIST.length}
          </span>
        </div>
        <ul className="space-y-1.5 text-sm">
          {SUNDAY_PREP_CHECKLIST.map((task, i) => (
            <li key={i}>
              <button
                onClick={() => toggleItem(i)}
                className="flex items-start gap-2 text-left w-full"
              >
                <span
                  className="mt-0.5 shrink-0 grid place-items-center h-4 w-4 rounded-full border border-white/60 text-[10px]"
                  style={{ background: checked[i] ? "white" : "transparent", color: checked[i] ? "var(--macro-protein)" : "transparent" }}
                >
                  ✓
                </span>
                <span className={checked[i] ? "line-through opacity-60" : ""}>{task}</span>
              </button>
            </li>
          ))}
        </ul>
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
