import type { Question } from "@/constants/question";

// "  Leonardo  DA Vínci " -> "leonardo da vinci"
export function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .toLocaleLowerCase()
    .replace(/\s+/g, " ");
}

export type AnswerStatus = "exact" | "close" | "wrong";

export type TypedAnswerResult = {
  status: AnswerStatus;
  spelling?: string;
};

export function levenshtein(a: string, b: string): number {
  let previous = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + cost,
      );
    }
    previous = current;
  }
  return previous[b.length];
}

function allowedTypos(normalizedAnswer: string): number {
  if (Number.isFinite(Number(normalizedAnswer))) return 0;
  if (normalizedAnswer.length >= 9) return 2;
  if (normalizedAnswer.length >= 5) return 1;
  return 0;
}

export function checkTypedAnswer(
  question: Question,
  typed: string,
): TypedAnswerResult {
  const accepted = Array.isArray(question.answer)
    ? question.answer
    : [question.answer];
  const normalizedTyped = normalize(typed);
  if (!normalizedTyped) return { status: "wrong" };

  if (accepted.some((ans) => normalize(ans) === normalizedTyped)) {
    return { status: "exact" };
  }

  let best: { spelling: string; distance: number } | null = null;
  for (const ans of accepted) {
    const normalizedAnswer = normalize(ans);
    const distance = levenshtein(normalizedTyped, normalizedAnswer);
    if (distance > allowedTypos(normalizedAnswer)) continue;
    if (!best || distance < best.distance) best = { spelling: ans, distance };
  }

  return best
    ? { status: "close", spelling: best.spelling }
    : { status: "wrong" };
}

export function getCorrectAnswer(question: Question): string {
  if (question.type === "mcq") {
    return question.options?.[Number(question.answer)] ?? "";
  }
  return Array.isArray(question.answer) ? question.answer[0] : question.answer;
}
