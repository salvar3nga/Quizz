import { describe, expect, it } from "vitest";
import type { Question } from "@/constants/question";
import { checkTypedAnswer, getCorrectAnswer, levenshtein } from "./answers";

function typed(answer: string | string[]): Question {
  return { type: "text", category: "History", question: "?", answer };
}

const statusOf = (answer: string | string[], input: string) =>
  checkTypedAnswer(typed(answer), input).status;

describe("checkTypedAnswer", () => {
  it("accepts an exact match", () => {
    expect(checkTypedAnswer(typed("Ottawa"), "Ottawa")).toEqual({ status: "exact" });
  });

  it("ignores case", () => {
    expect(statusOf("Ottawa", "oTTAWA")).toBe("exact");
  });

  it("ignores accents on either side", () => {
    expect(statusOf("Leonardo da Vinci", "Leonardo da Vínci")).toBe("exact");
    expect(statusOf("Málaga", "malaga")).toBe("exact");
  });

  it("ignores leading, trailing and repeated spaces", () => {
    expect(statusOf("Leonardo da Vinci", "  leonardo   da  vinci ")).toBe("exact");
  });

  it("accepts any answer from a list", () => {
    expect(statusOf(["Shakshuka", "Shakshouka"], "shakshuka")).toBe("exact");
    expect(statusOf(["Shakshuka", "Shakshouka"], "SHAKSHOUKA")).toBe("exact");
  });

  it("rejects a wrong answer", () => {
    expect(statusOf("Ottawa", "Toronto")).toBe("wrong");
    expect(statusOf(["Shakshuka", "Shakshouka"], "Paella")).toBe("wrong");
  });

  it("rejects an empty answer", () => {
    expect(statusOf("Ottawa", "   ")).toBe("wrong");
  });

  describe("near misses", () => {
    it("allows one typo for 5–8 character answers and returns the spelling", () => {
      expect(checkTypedAnswer(typed("Ottawa"), "ottowa")).toEqual({
        status: "close",
        spelling: "Ottawa",
      });
      expect(statusOf("Paris", "Pariss")).toBe("close");
      expect(statusOf("Shakshuka", "Shakshuuka")).toBe("close");
    });

    it("rejects two typos for 5–8 character answers", () => {
      expect(statusOf("Ottawa", "ottowe")).toBe("wrong");
    });

    it("allows two typos for answers of 9 or more characters", () => {
      expect(statusOf("Kaiserschmarrn", "Kaisershmaren")).toBe("close");
      expect(statusOf("Photosynthesis", "fotosynthesis")).toBe("close");
    });

    it("rejects three typos for long answers", () => {
      expect(statusOf("Kaiserschmarrn", "Kaisershmarem")).toBe("wrong");
    });

    it("requires short answers to match exactly", () => {
      expect(statusOf("Rome", "Roma")).toBe("wrong");
      expect(statusOf("Mao", "Moa")).toBe("wrong");
    });

    it("requires numbers to match exactly", () => {
      expect(statusOf("1912", "1913")).toBe("wrong");
      expect(statusOf("2", "3")).toBe("wrong");
      expect(statusOf("299792458", "299792459")).toBe("wrong");
    });

    it("prefers an exact match over a close one", () => {
      expect(statusOf(["Shakshuka", "Shakshouka"], "shakshouka")).toBe("exact");
    });

    it("returns the closest accepted spelling", () => {
      expect(checkTypedAnswer(typed(["Shakshuka", "Shakshouka"]), "shakshoukka").spelling).toBe(
        "Shakshouka",
      );
    });
  });
});

describe("levenshtein", () => {
  it("counts insertions, deletions and substitutions", () => {
    expect(levenshtein("ottawa", "ottawa")).toBe(0);
    expect(levenshtein("ottowa", "ottawa")).toBe(1);
    expect(levenshtein("kitten", "sitting")).toBe(3);
    expect(levenshtein("", "abc")).toBe(3);
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
