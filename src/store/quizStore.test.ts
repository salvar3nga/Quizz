import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { get } from "svelte/store";
import type { Question } from "@/constants/question";
import type { Category } from "@/constants/category";
import { questions } from "@/constants/questions";
import {
  CATEGORIES_TO_INCLUDE_ON_ALL_CATEGORIES,
  MAX_QUESTIONS_IN_ALL_CATEGORIES,
  MAX_QUESTIONS_PER_CATEGORY,
  TIMER_DURATION,
} from "@/constants/constants";
import {
  answers,
  currentCategory,
  currentIndex,
  currentQuestions,
  nextQuestion,
  quizFinished,
  resetGame,
  revealed,
  score,
  startQuiz,
  submitAnswer,
  timeLeft,
} from "./quizStore";

function makeQuestions(category: Category, count: number): Question[] {
  return Array.from({ length: count }, (_, i) => ({
    type: "mcq",
    category,
    question: `${category} question ${i}`,
    options: ["A", "B", "C", "D"],
    answer: "2",
    answerText: "C",
  }));
}

// more questions than either limit, in every category used by "All"
const pool: Question[] = [
  ...CATEGORIES_TO_INCLUDE_ON_ALL_CATEGORIES.flatMap((cat) =>
    makeQuestions(cat, MAX_QUESTIONS_PER_CATEGORY + 5),
  ),
  ...makeQuestions("IT", MAX_QUESTIONS_PER_CATEGORY + 5),
];

afterEach(() => {
  resetGame();
  vi.useRealTimers();
});

describe("startQuiz", () => {
  it("picks at most MAX_QUESTIONS_PER_CATEGORY questions from one category", () => {
    startQuiz("Geography", pool);
    const selected = get(currentQuestions);

    expect(selected).toHaveLength(MAX_QUESTIONS_PER_CATEGORY);
    expect(selected.every((q) => q.category === "Geography")).toBe(true);
  });

  it("takes every question when a category has fewer than the limit", () => {
    startQuiz("IT", makeQuestions("IT", 3));
    expect(get(currentQuestions)).toHaveLength(3);
  });

  it("picks MAX_QUESTIONS_IN_ALL_CATEGORIES per included category for 'All'", () => {
    startQuiz("All", pool);
    const selected = get(currentQuestions);

    expect(selected).toHaveLength(
      MAX_QUESTIONS_IN_ALL_CATEGORIES *
        CATEGORIES_TO_INCLUDE_ON_ALL_CATEGORIES.length,
    );
    for (const cat of CATEGORIES_TO_INCLUDE_ON_ALL_CATEGORIES) {
      expect(selected.filter((q) => q.category === cat)).toHaveLength(
        MAX_QUESTIONS_IN_ALL_CATEGORIES,
      );
    }
    expect(selected.some((q) => q.category === "IT")).toBe(false);
  });

  it("points each mcq answer at the correct option after shuffling", () => {
    startQuiz("Geography", pool);
    for (const q of get(currentQuestions)) {
      expect(q.options?.[Number(q.answer)]).toBe(q.answerText);
    }
  });

  it("leaves the shared question data unchanged across rounds", () => {
    const snapshot = structuredClone(questions);

    startQuiz("General Knowledge", questions);
    startQuiz("All", questions);

    expect(questions).toEqual(snapshot);
  });

  it("resets the round state", () => {
    startQuiz("Geography", pool);
    submitAnswer("C", true);

    startQuiz("History", pool);

    expect(get(currentCategory)).toBe("History");
    expect(get(currentIndex)).toBe(0);
    expect(get(score)).toBe(0);
    expect(get(answers)).toEqual([]);
    expect(get(revealed)).toBe(false);
    expect(get(quizFinished)).toBe(false);
  });
});

describe("submitAnswer", () => {
  beforeEach(() => startQuiz("Geography", pool));

  it("records the answer, raises the score and reveals when correct", () => {
    const question = get(currentQuestions)[0];
    submitAnswer("C", true);

    expect(get(answers)).toEqual([
      { question, userAnswer: "C", isCorrect: true },
    ]);
    expect(get(score)).toBe(1);
    expect(get(revealed)).toBe(true);
  });

  it("records the answer without raising the score when wrong", () => {
    submitAnswer("A", false);

    expect(get(answers)).toHaveLength(1);
    expect(get(answers)[0].isCorrect).toBe(false);
    expect(get(score)).toBe(0);
    expect(get(revealed)).toBe(true);
  });

  it("ignores a second call while the result is revealed", () => {
    submitAnswer("C", true);
    submitAnswer("C", true);

    expect(get(answers)).toHaveLength(1);
    expect(get(score)).toBe(1);
  });
});

describe("timer in 'All' mode", () => {
  beforeEach(() => vi.useFakeTimers());

  it("counts down once per second", () => {
    startQuiz("All", pool);
    vi.advanceTimersByTime(3000);
    expect(get(timeLeft)).toBe(TIMER_DURATION - 3);
  });

  it("records userAnswer: null when time runs out", () => {
    startQuiz("All", pool);
    const question = get(currentQuestions)[0];

    vi.advanceTimersByTime(TIMER_DURATION * 1000);

    expect(get(timeLeft)).toBe(0);
    expect(get(answers)).toEqual([
      { question, userAnswer: null, isCorrect: false },
    ]);
    expect(get(revealed)).toBe(true);
  });

  it("stops once the answer is submitted", () => {
    startQuiz("All", pool);
    vi.advanceTimersByTime(2000);
    submitAnswer("C", true);
    vi.advanceTimersByTime(TIMER_DURATION * 1000);

    expect(get(timeLeft)).toBe(TIMER_DURATION - 2);
    expect(get(answers)).toHaveLength(1);
  });

  it("restarts for the next question", () => {
    startQuiz("All", pool);
    vi.advanceTimersByTime(5000);
    submitAnswer("C", true);
    nextQuestion();

    expect(get(timeLeft)).toBe(TIMER_DURATION);
  });

  it("does not run outside 'All'", () => {
    startQuiz("Geography", pool);
    vi.advanceTimersByTime(TIMER_DURATION * 2000);

    expect(get(answers)).toEqual([]);
    expect(get(revealed)).toBe(false);
  });
});

describe("nextQuestion", () => {
  it("moves to the next question and hides the result", () => {
    startQuiz("IT", makeQuestions("IT", 3));
    submitAnswer("C", true);
    nextQuestion();

    expect(get(currentIndex)).toBe(1);
    expect(get(revealed)).toBe(false);
    expect(get(quizFinished)).toBe(false);
  });

  it("finishes the quiz after the last question", () => {
    startQuiz("IT", makeQuestions("IT", 2));
    submitAnswer("C", true);
    nextQuestion();
    submitAnswer("A", false);
    nextQuestion();

    expect(get(currentIndex)).toBe(1);
    expect(get(quizFinished)).toBe(true);
  });
});

describe("resetGame", () => {
  it("clears everything", () => {
    startQuiz("IT", makeQuestions("IT", 2));
    submitAnswer("C", true);
    nextQuestion();

    resetGame();

    expect(get(currentCategory)).toBeNull();
    expect(get(currentQuestions)).toEqual([]);
    expect(get(currentIndex)).toBe(0);
    expect(get(score)).toBe(0);
    expect(get(answers)).toEqual([]);
    expect(get(revealed)).toBe(false);
    expect(get(quizFinished)).toBe(false);
  });

  it("stops the timer", () => {
    vi.useFakeTimers();
    startQuiz("All", pool);
    resetGame();
    vi.advanceTimersByTime(TIMER_DURATION * 2000);

    expect(get(answers)).toEqual([]);
    expect(vi.getTimerCount()).toBe(0);
  });
});
