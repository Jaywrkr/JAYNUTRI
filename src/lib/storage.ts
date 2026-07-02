"use client";

import { DayKey, DayLog, Profile } from "./types";
import { DEFAULT_PROFILE } from "./nutrition";

const KEYS = {
  logs: "jaynutri:logs:v1",
  profile: "jaynutri:profile:v1",
  budget: "jaynutri:budget:v1",
  completedDates: "jaynutri:completed-dates:v1",
  theme: "jaynutri:theme:v1",
  textScale: "jaynutri:text-scale:v1",
};

export type WeekLogs = Record<DayKey, DayLog>;

function emptyDayLog(): DayLog {
  return { breakfastEaten: false, lunchEaten: false, dinnerEaten: false, extras: [], lunchPortion: 1 };
}

export function emptyLogs(): WeekLogs {
  return {
    lunes: emptyDayLog(),
    martes: emptyDayLog(),
    miercoles: emptyDayLog(),
    jueves: emptyDayLog(),
    viernes: emptyDayLog(),
    sabado: emptyDayLog(),
    domingo: emptyDayLog(),
  };
}

export function loadLogs(): WeekLogs {
  if (typeof window === "undefined") return emptyLogs();
  try {
    const raw = window.localStorage.getItem(KEYS.logs);
    if (!raw) return emptyLogs();
    const stored = JSON.parse(raw) as Partial<WeekLogs>;
    const merged = emptyLogs();
    for (const day of Object.keys(merged) as DayKey[]) {
      merged[day] = {
        ...merged[day],
        ...stored[day],
        extras: stored[day]?.extras ?? [],
        lunchPortion: stored[day]?.lunchPortion ?? 1,
      };
    }
    return merged;
  } catch {
    return emptyLogs();
  }
}

export function saveLogs(logs: WeekLogs) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEYS.logs, JSON.stringify(logs));
}

export function loadProfile(): Profile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = window.localStorage.getItem(KEYS.profile);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: Profile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEYS.profile, JSON.stringify(profile));
}

// Presupuesto mínimo realista para sostener ~145 g de proteína/día en Cuenca
const DEFAULT_BUDGET = 70;

export function loadBudget(): number {
  if (typeof window === "undefined") return DEFAULT_BUDGET;
  const raw = window.localStorage.getItem(KEYS.budget);
  return raw ? Number(raw) : DEFAULT_BUDGET;
}

export function saveBudget(budget: number) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEYS.budget, String(budget));
}

// Historial de fechas (ISO yyyy-mm-dd) en que se completaron las 3 comidas del día,
// para poder calcular una racha real que sobrevive el cambio de semana.
export type CompletedDates = Record<string, boolean>;

export function loadCompletedDates(): CompletedDates {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEYS.completedDates);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveCompletedDates(dates: CompletedDates) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEYS.completedDates, JSON.stringify(dates));
}

export type Theme = "light" | "dark";

export function loadTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(KEYS.theme);
  return raw === "light" || raw === "dark" ? raw : null;
}

export function saveTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEYS.theme, theme);
}

export function loadTextScale(): number {
  if (typeof window === "undefined") return 1;
  const raw = window.localStorage.getItem(KEYS.textScale);
  return raw ? Number(raw) : 1;
}

export function saveTextScale(scale: number) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEYS.textScale, String(scale));
}
