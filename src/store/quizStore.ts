import { writable } from "svelte/store";
import type { Question } from "@/constants/question";
import type {Category} from "@/constants/category";
import { get } from "svelte/store";
import { shuffleArray } from "@/utils/shuffle";


export const currentCategory = writable<Category | null>(null);
export const currentQuestions = writable<Question[]>([]);
export const currentIndex = writable(0);
export const score = writable(0);
export const quizFinished = writable(false);
export const answers = writable<{
  question: Question;
  userAnswer: string | null;
  isCorrect: boolean;
}[]>([]);

const MAX_TIME = 15;
const ONE_SECOND_IN_MS = 1000;

export const timeLeft = writable(MAX_TIME);
let timerInterval: ReturnType<typeof setInterval> | null = null;

export function startQuiz(category: Category, allQuestions: Question[]) {
  currentCategory.set(category);

  const filteredQuestions = allQuestions.filter(q => q.category === category);
  const randomizedQuestions = shuffleArray(filteredQuestions);

  randomizedQuestions.forEach(q => {
    if(q.type === "mcq" && q.options){
      q.options = shuffleArray(q.options);

      const correct = q.options.findIndex(opt => opt === q.answerText);
      q.answer = String(correct);
    }
  })

  currentQuestions.set(randomizedQuestions);
  currentIndex.set(0);
  score.set(0);
  quizFinished.set(false);
  answers.set([]);
  resetTimer();
}

export function resetTimer() {
  // timeLeft.set(15);

  // if (timerInterval) clearInterval(timerInterval);

  // timerInterval = setInterval(() => {
  //   timeLeft.update(n => {
  //     if (n <= 1) {
  //       nextQuestion();
  //       return MAX_TIME;
  //     }
  //     return n - 1;
  //   });
  // }, ONE_SECOND_IN_MS);
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

export function recordAnswer(question: Question, userAnswer: string, isCorrect: boolean) {
  answers.update(arr => [...arr, { question, userAnswer, isCorrect: isCorrect }]);
}

export function resetGame(){
  currentCategory.set(null);
  currentQuestions.set([]);
  currentIndex.set(0);
  score.set(0);
  quizFinished.set(false);
  answers.set([]);
  resetTimer();
}