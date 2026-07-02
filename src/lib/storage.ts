"use client";

import { DayKey, DayLog, Profile } from "./types";
import { DEFAULT_PROFILE } from "./nutrition";

const KEYS = {
  logs: "jaynutri:logs:v1",
  profile: "jaynutri:profile:v1",
  budget: "jaynutri:budget:v1",
};

export type WeekLogs = Record<DayKey, DayLog>;

export function emptyLogs(): WeekLogs {
  return {
    lunes: { breakfastEaten: false, lunchEaten: false, dinnerEaten: false },
    martes: { breakfastEaten: false, lunchEaten: false, dinnerEaten: false },
    miercoles: { breakfastEaten: false, lunchEaten: false, dinnerEaten: false },
    jueves: { breakfastEaten: false, lunchEaten: false, dinnerEaten: false },
    viernes: { breakfastEaten: false, lunchEaten: false, dinnerEaten: false },
    sabado: { breakfastEaten: false, lunchEaten: false, dinnerEaten: false },
    domingo: { breakfastEaten: false, lunchEaten: false, dinnerEaten: false },
  };
}

export function loadLogs(): WeekLogs {
  if (typeof window === "undefined") return emptyLogs();
  try {
    const raw = window.localStorage.getItem(KEYS.logs);
    if (!raw) return emptyLogs();
    return { ...emptyLogs(), ...JSON.parse(raw) };
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
