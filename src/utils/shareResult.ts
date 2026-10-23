import type { Answer } from "@/store/quizStore";
import type { Category } from "@/constants/category";
import { CATEGORIES_TO_PLAY } from "@/constants/constants";

export const SHARE_URL = "https://salvar3nga.github.io/Quizz/";

export type Challenge = { category: Category; score: number; total: number };

const PLAYABLE: Category[] = [...CATEGORIES_TO_PLAY, "All"];

export function categorySlug(category: Category): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export function challengeUrl({ category, score, total }: Challenge): string {
  return `${SHARE_URL}?play=${categorySlug(category)}&beat=${score}-${total}`;
}

export function parseChallenge(search: string): Challenge | null {
  const params = new URLSearchParams(search);
  const category = PLAYABLE.find((c) => categorySlug(c) === params.get("play"));
  const match = /^(\d{1,3})-(\d{1,3})$/.exec(params.get("beat") ?? "");
  if (!category || !match) return null;

  const score = Number(match[1]);
  const total = Number(match[2]);
  if (total === 0 || score > total) return null;
  return { category, score, total };
}

// I got 11/15 in General Knowledge on Quizz Mei. Can you beat me?
// 🟩🟩🟥🟩…
export function buildChallenge(
  category: Category,
  answers: Answer[],
  total: number,
): string {
  const score = answers.filter((ans) => ans.isCorrect).length;
  const squares = answers.map((ans) => (ans.isCorrect ? "🟩" : "🟥")).join("");
  const where = category === "All" ? "across all categories" : `in ${category}`;
  const dare = score === total ? "Can you match it?" : "Can you beat me?";
  return `I got ${score}/${total} ${where} on Quizz Mei. ${dare}\n${squares}`;
}

export function buildShareText(
  category: Category,
  answers: Answer[],
  total: number,
): string {
  const score = answers.filter((ans) => ans.isCorrect).length;
  const url = challengeUrl({ category, score, total });
  return `${buildChallenge(category, answers, total)}\n${url}`;
}
