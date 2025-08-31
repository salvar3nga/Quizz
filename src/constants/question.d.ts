import { Category } from "./category";

type QuestionType = "mcq" | "image" | "text";

export type Question = {
  question: string;
  options?: string[];
  answer: string | string[];
  type: QuestionType;
  category: Category;
  imageUrl?: string;
  answerText?: string;
}