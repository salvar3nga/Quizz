import { describe, expect, it } from "vitest";
import type { Answer } from "@/store/quizStore";
import type { Question } from "@/constants/question";
import {
  buildChallenge,
  buildShareText,
  challengeUrl,
  parseChallenge,
  SHARE_URL,
} from "./shareResult";

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
  it("adds the challenge link on its own line", () => {
    expect(buildShareText("Science", [answer(true)], 1)).toBe(
      `I got 1/1 in Science on Quizz Mei. Can you match it?\n🟩\n${SHARE_URL}?play=science&beat=1-1`,
    );
  });
});

describe("challenge links", () => {
  it("round-trips every playable category", () => {
    for (const category of ["General Knowledge", "IT", "All"] as const) {
      const challenge = { category, score: 11, total: 15 };
      const url = new URL(challengeUrl(challenge));
      expect(parseChallenge(url.search)).toEqual(challenge);
    }
  });

  it("uses readable slugs", () => {
    expect(challengeUrl({ category: "General Knowledge", score: 11, total: 15 })).toBe(
      `${SHARE_URL}?play=general-knowledge&beat=11-15`,
    );
  });

  it("ignores links without a valid challenge", () => {
    expect(parseChallenge("")).toBeNull();
    expect(parseChallenge("?play=geography")).toBeNull();
    expect(parseChallenge("?play=cooking&beat=3-15")).toBeNull();
    expect(parseChallenge("?play=geography&beat=16-15")).toBeNull();
    expect(parseChallenge("?play=geography&beat=0-0")).toBeNull();
    expect(parseChallenge("?play=geography&beat=lots")).toBeNull();
  });
});
