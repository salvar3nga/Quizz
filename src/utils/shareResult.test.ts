import { describe, expect, it } from "vitest";
import type { Answer } from "@/store/quizStore";
import type { Question } from "@/constants/question";
import { buildChallenge, buildShareText, SHARE_URL } from "./shareResult";

const question: Question = { type: "text", category: "Geography", question: "?", answer: "Ottawa" };
const answer = (isCorrect: boolean, userAnswer: string | null = "x"): Answer => ({
  question,
  userAnswer,
  isCorrect,
});

describe("buildChallenge", () => {
  it("dares the friend to beat the score, with one square per question in order", () => {
    const text = buildChallenge(
      "General Knowledge",
      [answer(true), answer(true), answer(false), answer(true), answer(false, null)],
      5,
    );
    expect(text).toBe(
      "I got 3/5 in General Knowledge on Quizz Mei. Can you beat me?\n🟩🟩🟥🟩🟥",
    );
  });

  it("asks to match a perfect score", () => {
    expect(buildChallenge("Science", [answer(true), answer(true)], 2)).toBe(
      "I got 2/2 in Science on Quizz Mei. Can you match it?\n🟩🟩",
    );
  });

  it("names the timed round", () => {
    expect(buildChallenge("All", [answer(false)], 1)).toBe(
      "I got 0/1 across all categories on Quizz Mei. Can you beat me?\n🟥",
    );
  });
});

describe("buildShareText", () => {
  it("adds the link on its own line", () => {
    expect(buildShareText("Science", [answer(true)], 1)).toBe(
      `I got 1/1 in Science on Quizz Mei. Can you match it?\n🟩\n${SHARE_URL}`,
    );
  });
});
