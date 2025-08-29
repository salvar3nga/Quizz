import type { Question } from "./question";

export const questions: Question[] = [
  {
    type: "mcq",
    category: "Geography",
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "2",
  },
  {
    type: "mcq",
    question: "Which river runs through Baghdad?",
    options: ["Tigris", "Euphrates", "Nile", "Amazon"],
    answer: "0",
    category: "Geography",
  },
  {
    type: "mcq",
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "3",
    category: "Geography",
  },
  {
    type: "text",
    category: "History",
    question: "Who was the first president of the USA?",
    answer: ["George Washington", "George W.", "G. Washington"],
  },
  {
    type: "image",
    category: "Geography",
    question: "Name the country",
    answer: "Angola",
    imageUrl: "../../public/flags/Angola.png"
  },
];

