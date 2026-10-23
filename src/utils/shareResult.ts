import type { Answer } from "@/store/quizStore";

export const SHARE_URL = "https://salvar3nga.github.io/Quizz/";

// Quizz Mei · General Knowledge 11/15
// 🟩🟩🟥🟩…
// https://salvar3nga.github.io/Quizz/
export function buildShareText(
  categoryLabel: string,
  answers: Answer[],
  total: number,
): string {
  const score = answers.filter((ans) => ans.isCorrect).length;
  const squares = answers.map((ans) => (ans.isCorrect ? "🟩" : "🟥")).join("");
  return `Quizz Mei · ${categoryLabel} ${score}/${total}\n${squares}\n${SHARE_URL}`;
}
