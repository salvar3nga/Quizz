import { writable } from "svelte/store";
import type { Question } from "@/constants/questions";
import type {Category} from "../constants/category";
  import { get } from "svelte/store";


export const currentCategory = writable<Category | null>(null);
export const currentQuestions = writable<Question[]>([]);
export const currentIndex = writable(0);
export const score = writable(0);
export const quizFinished = writable(false);

export const timeLeft = writable(15);
let timerInterval: ReturnType<typeof setInterval> | null = null;

export function startQuiz(category: Category, allQuestions: Question[]) {
  currentCategory.set(category);
  currentQuestions.set(allQuestions.filter(q => q.category === category));
  currentIndex.set(0);
  score.set(0);
  quizFinished.set(false);
  resetTimer();
}

export function resetTimer() {
  timeLeft.set(15);

  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timeLeft.update(n => {
      if (n <= 1) {
        nextQuestion();
        return 15; // reset for next
      }
      return n - 1;
    });
  }, 1000);
}

export function nextQuestion() {
  const index = get(currentIndex);
  const questions = get(currentQuestions);

  if (index + 1 < questions.length) {
    currentIndex.set(index + 1);
    resetTimer();
  } else {
    quizFinished.set(true);
    if (timerInterval) clearInterval(timerInterval);
  }
}