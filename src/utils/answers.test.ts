import { describe, expect, it } from "vitest";
import type { Question } from "@/constants/question";
import { getCorrectAnswer, isTypedAnswerCorrect } from "./answers";

function typed(answer: string | string[]): Question {
  return { type: "text", category: "History", question: "?", answer };
}

describe("isTypedAnswerCorrect", () => {
  it("accepts an exact match", () => {
    expect(isTypedAnswerCorrect(typed("Ottawa"), "Ottawa")).toBe(true);
  });

  it("ignores case", () => {
    expect(isTypedAnswerCorrect(typed("Ottawa"), "oTTAWA")).toBe(true);
  });

  it("ignores accents on either side", () => {
    expect(isTypedAnswerCorrect(typed("Leonardo da Vinci"), "Leonardo da Vínci")).toBe(true);
    expect(isTypedAnswerCorrect(typed("Málaga"), "malaga")).toBe(true);
  });

  it("ignores leading, trailing and repeated spaces", () => {
    expect(isTypedAnswerCorrect(typed("Leonardo da Vinci"), "  leonardo   da  vinci ")).toBe(true);
  });

  it("accepts any answer from a list", () => {
    const q = typed(["Shakshuka", "Shakshouka"]);
    expect(isTypedAnswerCorrect(q, "shakshuka")).toBe(true);
    expect(isTypedAnswerCorrect(q, "SHAKSHOUKA")).toBe(true);
  });

  it("rejects a wrong answer", () => {
    expect(isTypedAnswerCorrect(typed("Ottawa"), "Toronto")).toBe(false);
    expect(isTypedAnswerCorrect(typed(["Shakshuka", "Shakshouka"]), "Paella")).toBe(false);
  });

  it("rejects an empty answer", () => {
    expect(isTypedAnswerCorrect(typed("Ottawa"), "   ")).toBe(false);
  });

  it("does not accept a different number", () => {
    expect(isTypedAnswerCorrect(typed("1912"), "1913")).toBe(false);
    expect(isTypedAnswerCorrect(typed("2"), "3")).toBe(false);
  });
});

describe("getCorrectAnswer", () => {
  it("returns the option the mcq answer points to", () => {
    const q: Question = {
      type: "mcq",
      category: "General Knowledge",
      question: "?",
      options: ["O2", "H2O", "CO2"],
      answer: "1",
      answerText: "H2O",
    };
    expect(getCorrectAnswer(q)).toBe("H2O");
  });

  it("returns the first accepted answer for typed questions", () => {
    expect(getCorrectAnswer(typed(["Shakshuka", "Shakshouka"]))).toBe("Shakshuka");
    expect(getCorrectAnswer(typed("Ottawa"))).toBe("Ottawa");
  });
});
