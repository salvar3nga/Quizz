import { writable, get } from "svelte/store";
import type { Category } from "@/constants/category";

export type BestScore = { score: number; total: number };
export type BestScores = Partial<Record<Category, BestScore>>;

const STORAGE_KEY = "quizz:best";

function isBestScore(value: unknown): value is BestScore {
  const v = value as BestScore;
  return (
    typeof v === "object" &&
    v !== null &&
    Number.isInteger(v.score) &&
    Number.isInteger(v.total) &&
    v.total > 0
  );
}

// storage can be missing, blocked or hold junk; any of that means "no bests yet"
function load(): BestScores {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    return Object.fromEntries(
      Object.entries(parsed).filter(([, value]) => isBestScore(value)),
    );
  } catch {
    return {};
  }
}

function save(bests: BestScores) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bests));
  } catch {
    // the best still shows for this session
  }
}

export const bestScores = writable<BestScores>(load());

function isBetter(next: BestScore, current: BestScore): boolean {
  if (next.score !== current.score) return next.score > current.score;
  return next.total < current.total;
}

// returns true when an earlier best was beaten
export function recordScore(
  category: Category,
  score: number,
  total: number,
): boolean {
  if (total === 0) return false;

  const current = get(bestScores)[category];
  const next = { score, total };
  if (current && !isBetter(next, current)) return false;

  bestScores.update((bests) => ({ ...bests, [category]: next }));
  save(get(bestScores));
  return current !== undefined;
}
