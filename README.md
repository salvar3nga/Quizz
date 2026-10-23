# 🧠 Quizz Mei

A quiz application built with **Vite + Svelte + TypeScript**.  
Running on: https://salvar3nga.github.io/Quizz/ it supports multiple categories, randomized questions, timers, text-input answers, and image-based questions.

---

## Enjoyed this project?

If you had fun or found this quiz useful, please consider leaving a ⭐ on the repository! Your support motivates further development.

Many thanks.

---

## ✨ Features

- Current quiz categories: **General Knowledge**, **Geography**, **History**, **Science**
- **Play single category** or **Play all categories** (5 random questions per category)
- Question types:
  - ✅ Multiple choice
  - ✍️ Text input (typed answer)
  - 🖼️ Image-based (guess country, city, flag)
- **Countdown timer** only on "I want 'em all!" category
- **Randomized**:
  - Question order
  - Multiple choice options
- **Instant feedback** after answering, then continue with Next or Enter
- **Detailed report** after quiz:
  - Shows what you answered
  - Shows correct answer
  - Highlights correct/incorrect answers

---

## 🐞 Found a bug, have a feature request or an answer is incorrect?

If you discover a bug or have an idea for a new feature, please open an issue on the [GitHub Issues page](https://github.com/salvar3nga/Quizz/issues).

- Describe the bug or feature clearly
- Include steps to reproduce (if reporting a bug)
- Screenshots or extra details are welcome!

## Your feedback helps make this quiz better for everyone!

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/salvar3nga/Quizz.git

cd quizz
```

### 2. Install dependencies and run Project

```bash
pnpm install
pnpm run dev
```

Project will run on

```bash
http://localhost:5173/
```

---

### 3. Configuring it to your liking

### The `constants.ts` file

This file contains important configuration such as the total timer duration, which categories to include and message arrays used throughout the app, such as the final messages shown to users at the end of a quiz. You can customize these to your liking and need.

Happy configuring ;)
