"use client";

import { useEffect, useMemo, useState } from "react";
import { DAY_ORDER, WEEK_PLAN } from "@/lib/mealPlan";
import { calcTargets, sumMacros } from "@/lib/nutrition";
import { DayKey, Macros, MomLunchLog } from "@/lib/types";
import {
  loadBudget,
  loadLogs,
  loadProfile,
  saveBudget,
  saveLogs,
  saveProfile,
  WeekLogs,
} from "@/lib/storage";
import ProfileCalculator from "./ProfileCalculator";
import SundayBanner from "./SundayBanner";
import WeeklyMacroBars from "./WeeklyMacroBars";
import DayCard from "./DayCard";
import ShoppingCart from "./ShoppingCart";

export default function Dashboard() {
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState(loadProfile());
  const [logs, setLogs] = useState<WeekLogs>(loadLogs());
  const [budget, setBudget] = useState(loadBudget());
  const [activeDay, setActiveDay] = useState<DayKey>("lunes");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage/Date, not derivable during SSR
    setProfile(loadProfile());
    setLogs(loadLogs());
    setBudget(loadBudget());
    const todayIdx = new Date().getDay(); // 0=domingo
    const map: DayKey[] = [
      "domingo",
      "lunes",
      "martes",
      "miercoles",
      "jueves",
      "viernes",
      "sabado",
    ];
    setActiveDay(map[todayIdx]);
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) saveProfile(profile);
  }, [profile, ready]);

  useEffect(() => {
    if (ready) saveLogs(logs);
  }, [logs, ready]);

  useEffect(() => {
    if (ready) saveBudget(budget);
  }, [budget, ready]);

  const { macros: dailyTarget } = calcTargets(profile);
  const weeklyTarget: Macros = useMemo(
    () => ({
      kcal: dailyTarget.kcal * 7,
      protein: dailyTarget.protein * 7,
      carbs: dailyTarget.carbs * 7,
      fat: dailyTarget.fat * 7,
    }),
    [dailyTarget]
  );

  const weeklyConsumed = useMemo(() => {
    const all: Macros[] = [];
    for (const day of WEEK_PLAN) {
      const log = logs[day.day];
      if (log.breakfastEaten) all.push(day.breakfast.macros);
      if (log.lunchEaten) {
        if (day.lunch.type === "recipe") all.push(day.lunch.recipe.macros);
        else if (log.momLunch) all.push(log.momLunch.macros);
      }
      if (log.dinnerEaten) all.push(day.dinner.macros);
    }
    return sumMacros(all);
  }, [logs]);

  const toggleMeal = (
    day: DayKey,
    meal: "breakfastEaten" | "lunchEaten" | "dinnerEaten"
  ) => {
    setLogs((prev) => ({
      ...prev,
      [day]: { ...prev[day], [meal]: !prev[day][meal] },
    }));
  };

  const saveMomLunch = (day: DayKey, log: MomLunchLog) => {
    setLogs((prev) => ({ ...prev, [day]: { ...prev[day], momLunch: log } }));
  };

  const clearMomLunch = (day: DayKey) => {
    setLogs((prev) => ({
      ...prev,
      [day]: { ...prev[day], momLunch: undefined, lunchEaten: false },
    }));
  };

  const currentDayPlan = WEEK_PLAN.find((d) => d.day === activeDay)!;

  return (
    <div className="mx-auto max-w-4xl w-full px-4 sm:px-6 py-8 space-y-6">
      <header className="pt-2">
        <div className="flex items-center gap-2">
          <span
            className="grid place-items-center h-11 w-11 rounded-2xl text-xl shrink-0"
            style={{ background: "var(--brand-gradient)" }}
          >
            🥗
          </span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight gradient-text">
              JayNutri
            </h1>
            <p className="text-sm -mt-0.5" style={{ color: "var(--text-secondary)" }}>
              Plan semanal de Jay
            </p>
          </div>
        </div>
        <p className="text-xs sm:text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Cuenca, Ecuador · compra única los domingos · batch cooking · sin melón, sin azúcar,
          sin procesados
        </p>
      </header>

      <ProfileCalculator profile={profile} onChange={setProfile} />

      <SundayBanner />

      <WeeklyMacroBars consumed={weeklyConsumed} weeklyTarget={weeklyTarget} />

      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="grid place-items-center h-8 w-8 rounded-xl text-base bg-[color-mix(in_oklab,var(--macro-carbs)_18%,transparent)]">
            📅
          </span>
          <h2 className="text-lg font-semibold">Plan de comidas de la semana</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {DAY_ORDER.map((d) => {
            const plan = WEEK_PLAN.find((p) => p.day === d)!;
            const active = activeDay === d;
            return (
              <button
                key={d}
                onClick={() => setActiveDay(d)}
                className="shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all"
                style={
                  active
                    ? { background: "var(--brand-gradient)", color: "white" }
                    : {
                        border: "1px solid var(--border-hairline)",
                        color: "var(--text-secondary)",
                        background: "var(--surface)",
                      }
                }
              >
                {plan.label.split(" ")[0]}
              </button>
            );
          })}
        </div>

        <DayCard
          day={currentDayPlan}
          log={logs[activeDay]}
          dailyTarget={dailyTarget}
          onToggleMeal={(meal) => toggleMeal(activeDay, meal)}
          onSaveMomLunch={(log) => saveMomLunch(activeDay, log)}
          onClearMomLunch={() => clearMomLunch(activeDay)}
        />
      </section>

      <ShoppingCart budget={budget} onBudgetChange={setBudget} />

      <footer className="text-xs text-center pt-4 pb-2" style={{ color: "var(--text-muted)" }}>
        Hecho para Jay · datos guardados solo en este navegador (localStorage)
      </footer>
    </div>
  );
}
