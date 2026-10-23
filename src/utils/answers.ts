import type { Question } from "@/constants/question";

// "  Leonardo  DA Vínci " -> "leonardo da vinci"
function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .toLocaleLowerCase()
    .replace(/\s+/g, " ");
}

export function isTypedAnswerCorrect(question: Question, typed: string): boolean {
  const accepted = Array.isArray(question.answer)
    ? question.answer
    : [question.answer];
  const normalizedTyped = normalize(typed);
  return accepted.some((ans) => normalize(ans) === normalizedTyped);
}

export function getCorrectAnswer(question: Question): string {
  if (question.type === "mcq") {
    return question.options?.[Number(question.answer)] ?? "";
  }
  return Array.isArray(question.answer) ? question.answer[0] : question.answer;
}
