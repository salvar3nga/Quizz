import { writable, derived } from "svelte/store";
import type { Question } from "@/constants/question";
import type { Category } from "@/constants/category";
import { get } from "svelte/store";
import { shuffleArray } from "@/utils/shuffle";
import { recordScore } from "./bestScores";

import {
  TIMER_DURATION,
  MAX_QUESTIONS_PER_CATEGORY,
  MAX_QUESTIONS_IN_ALL_CATEGORIES,
  CATEGORIES_TO_INCLUDE_ON_ALL_CATEGORIES,
} from "@/constants/constants";

export type Answer = {
  question: Question;
  userAnswer: string | null; // null when the timer ran out
  isCorrect: boolean;
};

export const currentCategory = writable<Category | null>(null);
export const currentQuestions = writable<Question[]>([]);
export const currentIndex = writable(0);
export const score = writable(0);
export const quizFinished = writable(false);
export const answers = writable<Answer[]>([]);
export const revealed = writable(false);
export const isNewBest = writable(false);
export const streak = derived(answers, ($answers) => {
  let count = 0;
  for (let i = $answers.length - 1; i >= 0 && $answers[i].isCorrect; i--) {
    count++;
  }
  return count;
});

const ONE_SECOND_IN_MS = 1000;

export const timeLeft = writable(TIMER_DURATION);
let timerInterval: ReturnType<typeof setInterval> | null = null;

export function startQuiz(category: Category, allQuestions: Question[]) {
  currentCategory.set(category);
  let selectedQuestions: Question[] = [];

  if (category === "All") {
    const groupedCategories: Category[] =
      CATEGORIES_TO_INCLUDE_ON_ALL_CATEGORIES;
    selectedQuestions = groupedCategories.flatMap((cat) => {
      const filtered = allQuestions.filter((q) => q.category === cat);
      return shuffleArray(filtered).slice(0, MAX_QUESTIONS_IN_ALL_CATEGORIES);
    });
    selectedQuestions = shuffleArray(selectedQuestions);
  } else {
    selectedQuestions = allQuestions.filter((q) => q.category === category);
    selectedQuestions = shuffleArray(selectedQuestions).slice(
      0,
      MAX_QUESTIONS_PER_CATEGORY,
    );
  }

  const randomizedQuestions = selectedQuestions.map((q) => {
    if (q.type !== "mcq" || !q.options) return { ...q };

    const options = shuffleArray(q.options);
    const correct = options.findIndex((opt) => opt === q.answerText);
    return { ...q, options, answer: String(correct) };
  });

  currentQuestions.set(randomizedQuestions);
  currentIndex.set(0);
  score.set(0);
  quizFinished.set(false);
  answers.set([]);
  revealed.set(false);
  isNewBest.set(false);
  startTimer();
}

function startTimer() {
  stopTimer();
  if (get(currentCategory) !== "All") return;

  timeLeft.set(TIMER_DURATION);
  timerInterval = setInterval(() => {
    if (get(timeLeft) <= 1) {
      timeLeft.set(0);
      submitAnswer(null, false);
      return;
    }
    timeLeft.update((n) => n - 1);
  }, ONE_SECOND_IN_MS);
}

function stopTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;
}

export function submitAnswer(userAnswer: string | null, isCorrect: boolean) {
  if (get(revealed)) return;

  const question = get(currentQuestions)[get(currentIndex)];
  stopTimer();

  if (isCorrect) {
    score.update((n) => n + 1);
  }

  answers.update((arr) => [...arr, { question, userAnswer, isCorrect }]);
  revealed.set(true);
}

export function nextQuestion() {
  const index = get(currentIndex);
  const questions = get(currentQuestions);

  revealed.set(false);

  if (index + 1 < questions.length) {
    currentIndex.set(index + 1);
    startTimer();
  } else {
    stopTimer();
    const category = get(currentCategory);
    if (category) {
      isNewBest.set(recordScore(category, get(score), questions.length));
    }
    quizFinished.set(true);
  }
}

export function resetGame() {
  stopTimer();
  currentCategory.set(null);
  currentQuestions.set([]);
  currentIndex.set(0);
  score.set(0);
  quizFinished.set(false);
  answers.set([]);
  revealed.set(false);
  isNewBest.set(false);
}
