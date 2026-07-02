"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { DAY_ORDER, WEEK_PLAN } from "@/lib/mealPlan";
import { calcTargets, scaleMacros, sumMacros } from "@/lib/nutrition";
import { buildWeeklyInsight } from "@/lib/insights";
import { computeStreak, toISODate } from "@/lib/streak";
import { DayKey, ExtraEntry, Macros, MomLunchLog } from "@/lib/types";
import {
  CompletedDates,
  loadBudget,
  loadCompletedDates,
  loadLogs,
  loadProfile,
  saveBudget,
  saveCompletedDates,
  saveLogs,
  saveProfile,
  WeekLogs,
} from "@/lib/storage";
import NavBar from "./NavBar";
import HeroStat from "./HeroStat";
import StreakBadge from "./StreakBadge";
import ProfileCalculator from "./ProfileCalculator";
import SundayBanner from "./SundayBanner";
import InsightsCard from "./InsightsCard";
import DailyMacroBars from "./DailyMacroBars";
import WeeklyMacroBars from "./WeeklyMacroBars";
import DaySelector from "./DaySelector";
import DayCard from "./DayCard";
import ShoppingCart from "./ShoppingCart";
import MobileTabBar from "./MobileTabBar";
import { useToast } from "./Toast";

const DOW_MAP: DayKey[] = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

const MEAL_LABEL: Record<"breakfastEaten" | "lunchEaten" | "dinnerEaten", string> = {
  breakfastEaten: "Desayuno",
  lunchEaten: "Almuerzo",
  dinnerEaten: "Cena",
};

export default function Dashboard() {
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState(loadProfile());
  const [logs, setLogs] = useState<WeekLogs>(loadLogs());
  const [budget, setBudget] = useState(loadBudget());
  const [completedDates, setCompletedDates] = useState<CompletedDates>({});
  const [activeDay, setActiveDay] = useState<DayKey>("lunes");
  const [todayKey, setTodayKey] = useState<DayKey>("lunes");
  const [todayLabel, setTodayLabel] = useState("");
  const [todayISO, setTodayISO] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage/Date, not derivable during SSR
    setProfile(loadProfile());
    setLogs(loadLogs());
    setBudget(loadBudget());
    setCompletedDates(loadCompletedDates());
    const now = new Date();
    const key = DOW_MAP[now.getDay()];
    setActiveDay(key);
    setTodayKey(key);
    setTodayISO(toISODate(now));
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

  // Snapshot today's completion into date-keyed history so the streak survives
  // the weekly template resetting (logs are keyed by weekday name, not date).
  useEffect(() => {
    if (!ready || !todayISO) return;
    const todayLog = logs[todayKey];
    const isComplete = todayLog.breakfastEaten && todayLog.lunchEaten && todayLog.dinnerEaten;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs a derived value into cross-session localStorage history, not a pure render derivation
    setCompletedDates((prev) => {
      if (!!prev[todayISO] === isComplete) return prev;
      const next = { ...prev, [todayISO]: isComplete };
      saveCompletedDates(next);
      return next;
    });
  }, [logs, todayKey, todayISO, ready]);

  const streak = useMemo(() => {
    if (!ready || !todayISO) return 0;
    return computeStreak(completedDates, new Date(todayISO + "T00:00:00"));
  }, [completedDates, todayISO, ready]);

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
        if (plan.lunch.type === "recipe") {
          all.push(scaleMacros(plan.lunch.recipe.macros, log.lunchPortion));
        } else if (log.momLunch) {
          all.push(log.momLunch.macros);
        }
      }
      if (log.dinnerEaten) all.push(plan.dinner.macros);
      all.push(...log.extras.map((e) => e.macros));
      return sumMacros(all);
    },
    [logs]
  );

  const weeklyConsumed = useMemo(
    () => sumMacros(WEEK_PLAN.map((d) => macrosForDay(d.day))),
    [macrosForDay]
  );

  const todayConsumed = useMemo(() => macrosForDay(todayKey), [macrosForDay, todayKey]);

  const elapsedFraction = useMemo(() => {
    const idx = DAY_ORDER.indexOf(todayKey);
    return (idx + 1) / 7;
  }, [todayKey]);

  const insight = useMemo(
    () => buildWeeklyInsight(weeklyConsumed, weeklyTarget, ready ? elapsedFraction : 0),
    [weeklyConsumed, weeklyTarget, elapsedFraction, ready]
  );

  const weekData = useMemo(
    () =>
      WEEK_PLAN.map((d) => {
        const m = macrosForDay(d.day);
        return {
          label: d.label.slice(0, 3),
          kcal: m.kcal,
          protein: m.protein,
          isToday: d.day === todayKey,
        };
      }),
    [macrosForDay, todayKey]
  );

  const todayRows = useMemo(() => {
    const plan = WEEK_PLAN.find((d) => d.day === todayKey);
    const log = logs[todayKey];
    if (!plan || !log) return [];
    const lunchKcal =
      plan.lunch.type === "recipe"
        ? scaleMacros(plan.lunch.recipe.macros, log.lunchPortion).kcal
        : log.momLunch?.macros.kcal ?? 0;
    const lunchSub =
      plan.lunch.type === "recipe" ? plan.lunch.recipe.name : log.momLunch?.description || "Casa de mamá";
    return [
      {
        icon: "🌅",
        iconBg: "color-mix(in oklab, var(--macro-fat) 20%, transparent)",
        label: "Desayuno",
        sublabel: plan.breakfast.name,
        kcal: plan.breakfast.macros.kcal,
        eaten: log.breakfastEaten,
      },
      {
        icon: "🍽️",
        iconBg: "color-mix(in oklab, var(--brand-orange) 20%, transparent)",
        label: "Almuerzo",
        sublabel: lunchSub,
        kcal: lunchKcal,
        eaten: log.lunchEaten,
      },
      {
        icon: "🌙",
        iconBg: "color-mix(in oklab, var(--macro-carbs) 20%, transparent)",
        label: "Cena",
        sublabel: plan.dinner.name,
        kcal: plan.dinner.macros.kcal,
        eaten: log.dinnerEaten,
      },
    ];
  }, [todayKey, logs]);

  const toggleMeal = (
    day: DayKey,
    meal: "breakfastEaten" | "lunchEaten" | "dinnerEaten"
  ) => {
    const willBeEaten = !logs[day][meal];
    setLogs((prev) => ({
      ...prev,
      [day]: { ...prev[day], [meal]: !prev[day][meal] },
    }));
    if (willBeEaten) {
      showToast(`${MEAL_LABEL[meal]} marcado como comido ✓`, () =>
        setLogs((prev) => ({ ...prev, [day]: { ...prev[day], [meal]: false } }))
      );
    }
  };

  const saveMomLunch = (day: DayKey, log: MomLunchLog) => {
    setLogs((prev) => ({ ...prev, [day]: { ...prev[day], momLunch: log } }));
    showToast("Almuerzo de mamá registrado — macros del día ajustados");
  };

  const clearMomLunch = (day: DayKey) => {
    setLogs((prev) => ({
      ...prev,
      [day]: { ...prev[day], momLunch: undefined, lunchEaten: false },
    }));
  };

  const addExtra = (day: DayKey, entry: ExtraEntry) => {
    setLogs((prev) => ({
      ...prev,
      [day]: { ...prev[day], extras: [...prev[day].extras, entry] },
    }));
    showToast(`${entry.name} agregado ✓ (${entry.macros.kcal} kcal)`, () =>
      setLogs((prev) => ({
        ...prev,
        [day]: { ...prev[day], extras: prev[day].extras.filter((e) => e.id !== entry.id) },
      }))
    );
  };

  const removeExtra = (day: DayKey, id: string) => {
    setLogs((prev) => ({
      ...prev,
      [day]: { ...prev[day], extras: prev[day].extras.filter((e) => e.id !== id) },
    }));
  };

  const setLunchPortion = (day: DayKey, portion: number) => {
    setLogs((prev) => ({ ...prev, [day]: { ...prev[day], lunchPortion: portion } }));
  };

  const currentDayPlan = WEEK_PLAN.find((d) => d.day === activeDay)!;

  return (
    <>
      <NavBar todayLabel={todayLabel} />
      <div className="mx-auto max-w-5xl w-full px-4 sm:px-6 py-8 space-y-6">
        <header className="pt-1" id="hoy">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight gradient-text">
              Plan semanal de Jay
            </h1>
            <StreakBadge streak={streak} />
          </div>
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

        <InsightsCard
          weekData={weekData}
          weeklyConsumed={weeklyConsumed}
          weeklyTarget={weeklyTarget}
          todayRows={todayRows}
        />

        <DailyMacroBars consumed={todayConsumed} target={dailyTarget} />

        <WeeklyMacroBars consumed={weeklyConsumed} weeklyTarget={weeklyTarget} insight={insight} />

        <section id="semana" className="scroll-mt-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="grid place-items-center h-8 w-8 rounded-xl text-base bg-[color-mix(in_oklab,var(--macro-carbs)_18%,transparent)]">
              📅
            </span>
            <h2 className="text-lg font-semibold">Plan de comidas de la semana</h2>
          </div>

          <DaySelector activeDay={activeDay} onChange={setActiveDay} todayKey={todayKey} logs={logs} />

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
                onAddExtra={(entry) => addExtra(activeDay, entry)}
                onRemoveExtra={(id) => removeExtra(activeDay, id)}
                onLunchPortionChange={(portion) => setLunchPortion(activeDay, portion)}
              />
            </motion.div>
          </AnimatePresence>
        </section>

        <ShoppingCart budget={budget} onBudgetChange={setBudget} />

        <footer className="text-xs text-center pt-4 pb-2" style={{ color: "var(--text-muted)" }}>
          Hecho para Jay · datos guardados solo en este navegador (localStorage)
        </footer>

        <div className="mobile-tabbar-spacer sm:hidden" aria-hidden />
      </div>
      <MobileTabBar />
    </>
  );
}
