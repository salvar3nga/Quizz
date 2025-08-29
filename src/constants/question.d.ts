import { Category } from "./category";

type QuestionType = "mcq" | "image" | "text";

export type Question = {
  question: string;
  options?: string[];
  answer: string;
  type: QuestionType;
  category: Category;
  imageUrl?: string;
}