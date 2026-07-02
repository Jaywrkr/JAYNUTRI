"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { WEEK_PLAN } from "@/lib/mealPlan";
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
import NavBar from "./NavBar";
import HeroStat from "./HeroStat";
import ProfileCalculator from "./ProfileCalculator";
import SundayBanner from "./SundayBanner";
import WeeklyMacroBars from "./WeeklyMacroBars";
import DaySelector from "./DaySelector";
import DayCard from "./DayCard";
import ShoppingCart from "./ShoppingCart";

const DOW_MAP: DayKey[] = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

export default function Dashboard() {
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState(loadProfile());
  const [logs, setLogs] = useState<WeekLogs>(loadLogs());
  const [budget, setBudget] = useState(loadBudget());
  const [activeDay, setActiveDay] = useState<DayKey>("lunes");
  const [todayKey, setTodayKey] = useState<DayKey>("lunes");
  const [todayLabel, setTodayLabel] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage/Date, not derivable during SSR
    setProfile(loadProfile());
    setLogs(loadLogs());
    setBudget(loadBudget());
    const now = new Date();
    const key = DOW_MAP[now.getDay()];
    setActiveDay(key);
    setTodayKey(key);
    setTodayLabel(
      now.toLocaleDateString("es-EC", { weekday: "long", day: "numeric", month: "long" })
    );
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

  const macrosForDay = useCallback(
    (day: DayKey): Macros => {
      const plan = WEEK_PLAN.find((p) => p.day === day)!;
      const log = logs[day];
      const all: Macros[] = [];
      if (log.breakfastEaten) all.push(plan.breakfast.macros);
      if (log.lunchEaten) {
        if (plan.lunch.type === "recipe") all.push(plan.lunch.recipe.macros);
        else if (log.momLunch) all.push(log.momLunch.macros);
      }
      if (log.dinnerEaten) all.push(plan.dinner.macros);
      return sumMacros(all);
    },
    [logs]
  );

  const weeklyConsumed = useMemo(
    () => sumMacros(WEEK_PLAN.map((d) => macrosForDay(d.day))),
    [macrosForDay]
  );

  const todayConsumed = useMemo(() => macrosForDay(todayKey), [macrosForDay, todayKey]);

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
    <>
      <NavBar todayLabel={todayLabel} />
      <div className="mx-auto max-w-5xl w-full px-4 sm:px-6 py-8 space-y-6">
        <header className="pt-1">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight gradient-text">
            Plan semanal de Jay
          </h1>
          <p className="text-xs sm:text-sm mt-2" style={{ color: "var(--text-muted)" }}>
            Cuenca, Ecuador · compra única los domingos · batch cooking · sin melón, sin azúcar,
            sin procesados
          </p>
        </header>

        <div className="grid lg:grid-cols-[1.1fr_1.4fr] gap-4 items-stretch">
          <HeroStat
            label="Hoy"
            consumed={todayConsumed}
            target={dailyTarget}
            dayLabel={WEEK_PLAN.find((d) => d.day === todayKey)?.label.split(" ")[0] ?? ""}
          />
          <ProfileCalculator profile={profile} onChange={setProfile} />
        </div>

        <SundayBanner />

        <WeeklyMacroBars consumed={weeklyConsumed} weeklyTarget={weeklyTarget} />

        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="grid place-items-center h-8 w-8 rounded-xl text-base bg-[color-mix(in_oklab,var(--macro-carbs)_18%,transparent)]">
              📅
            </span>
            <h2 className="text-lg font-semibold">Plan de comidas de la semana</h2>
          </div>

          <DaySelector activeDay={activeDay} onChange={setActiveDay} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <DayCard
                day={currentDayPlan}
                log={logs[activeDay]}
                dailyTarget={dailyTarget}
                onToggleMeal={(meal) => toggleMeal(activeDay, meal)}
                onSaveMomLunch={(log) => saveMomLunch(activeDay, log)}
                onClearMomLunch={() => clearMomLunch(activeDay)}
              />
            </motion.div>
          </AnimatePresence>
        </section>

        <ShoppingCart budget={budget} onBudgetChange={setBudget} />

        <footer className="text-xs text-center pt-4 pb-2" style={{ color: "var(--text-muted)" }}>
          Hecho para Jay · datos guardados solo en este navegador (localStorage)
        </footer>
      </div>
    </>
  );
}
