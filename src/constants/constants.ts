import type { Category } from "./category";
import type { FinalMessages } from "./finalMessage";
import { FinalMessageKey } from "./finalMessage";
export const TIMER_DURATION = 20;
export const MAX_QUESTIONS_PER_CATEGORY = 15;
export const MAX_QUESTIONS_IN_ALL_CATEGORIES = 10; // takes max n questions for each category. Given n=10 and having 4 categories means a total of 40 questions
export const LOW_TIME_WARNING_THRESHOLD_IN_SECONDS = 5; // time by which the timer bar turns red

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

export const FINAL_MESSAGES: FinalMessages = {
  [FinalMessageKey.ZERO]: [
    "Well... that was a plot twist.",
    "Zero! You must have been speedrunning the wrong answers.",
    "Your score is as empty as my coffee mug ☕️",
    "What a legendary fail! But legends always come back.",
    "Did you just guess every answer? Bold strategy.",
    "If this was golf, you'd be winning.",
    "You missed every shot, but at least you took them.",
    "The quiz is still intact. Try again to break it.",
    "You’ve set a new record for humility.",
    "If quizzes had a basement, you’d be in it.",
  ],
  [FinalMessageKey.TWENTY]: [
    "You got a few! The rest are still hiding.",
    "20% – Not the worst, but not brag-worthy either.",
    "You’re warming up. Next time, go for the gold.",
    "You answered more than my cat would 🐱",
    "Hey, at least you didn’t get zero!",
    "You found a couple of needles in the haystack.",
    "A gentle nudge to your brain cells might help.",
    "You’re on the scoreboard, but the crowd is silent.",
    "You’re not last, but you’re not first either.",
    "The quiz gave you a few freebies.",
  ],
  [FinalMessageKey.FIFTY]: [
    "You could flip a coin and do just as well.",
    "You’re halfway to greatness (or disaster).",
    "Solid effort! Some answers were just not your friends today.",
    "You’re the median of mediocrity.",
    "You’re balanced, like a well-made sandwich.",
    "You’re neither hero nor villain. Just... here.",
  ],
  [FinalMessageKey.EIGHTY]: [
    "Now we’re talking.",
    "You’re almost a genius. Just a few brain cells short.",
    "You crushed it! Some questions barely survived.",
    "So close to perfection, you can smell it 👃",
    "You’re the MVP.",
    "You’re on fire, but not quite a blaze.",
    "You left a few questions in the dust.",
    "You’re the reason quizzes exist.",
    "You’re one step away from legendary.",
    "You could run a quiz bootcamp.",
  ],
  [FinalMessageKey.HUNDRED]: [
    "100%! Are you even human?",
    "You destroyed every question. Respect.",
    "Flawless victory! Time to retire undefeated.",
    "You’re the final boss. Everyone else is just playing.",
    "Quiz master unlocked!",
    "You’ve reached the summit. Oxygen not required.",
    "You could write the next quiz.",
    "You’re the answer key in human form.",
    "If quizzes had trophies, you’d need a bigger shelf.",
  ],
};
