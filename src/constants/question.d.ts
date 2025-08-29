import { Category } from "./category";

export type Question = {
  question: string;
  options: string[];
  answer: number;
  category: Category;
}