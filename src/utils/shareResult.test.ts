import { describe, expect, it } from "vitest";
import type { Answer } from "@/store/quizStore";
import type { Question } from "@/constants/question";
import { buildShareText, SHARE_URL } from "./shareResult";

const question: Question = { type: "text", category: "Geography", question: "?", answer: "Ottawa" };
const answer = (isCorrect: boolean, userAnswer: string | null = "x"): Answer => ({
  question,
  userAnswer,
  isCorrect,
});

describe("buildShareText", () => {
  it("lists the score and one square per question in order", () => {
    const text = buildShareText(
      "General Knowledge",
      [answer(true), answer(true), answer(false), answer(true), answer(false, null)],
      5,
    );
    expect(text).toBe(`Quizz Mei · General Knowledge 3/5\n🟩🟩🟥🟩🟥\n${SHARE_URL}`);
  });

  it("handles a round with nothing right", () => {
    expect(buildShareText("All categories", [answer(false)], 1)).toBe(
      `Quizz Mei · All categories 0/1\n🟥\n${SHARE_URL}`,
    );
  });
});
