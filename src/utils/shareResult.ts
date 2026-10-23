import type { Answer } from "@/store/quizStore";
import type { Category } from "@/constants/category";

export const SHARE_URL = "https://salvar3nga.github.io/Quizz/";

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
  return `${buildChallenge(category, answers, total)}\n${SHARE_URL}`;
}
