import type { Question } from "./question";

export const questions: Question[] = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: 2,
    category: "Geography",
  },
  {
    question: "Which river runs through Baghdad?",
    options: ["Tigris", "Euphrates", "Nile", "Amazon"],
    answer: 0,
    category: "Geography",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: 3,
    category: "Geography",
  },
  {
    question: "Who was the first president of the USA?",
    options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
    answer: 0,
    category: "History",
  },
];

