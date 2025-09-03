import type { Category } from "./category";
export const TIMER_DURATION = 20;
export const MAX_QUESTIONS_PER_CATEGORY = 15;
export const MAX_QUESTIONS_IN_ALL_CATEGORIES = 10; // takes max n questions for each category. Given n=10 and having 4 categories means a total of 40 questions
export const LOW_TIME_WARNING_THRESHOLD_IN_SECONDS = 6; // time by which the timer bar turns red

// Categories to include in the "All" category
export const CATEGORIES_TO_INCLUDE_ON_ALL_CATEGORIES: Category[] = [
  "General Knowledge",
  "Geography",
  "History",
  "Science",
  "Sports",
];

// categories you can play
export const CATEGORIES_TO_PLAY: Category[] = [
  "General Knowledge",
  "Geography",
  "History",
  "Science",
  "Sports",
  "IT",
];
