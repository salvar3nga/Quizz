# 🧠 Quizz Mei

A fast, friendly quiz app with multiple categories, a countdown mode, image questions and shareable results.

**[▶️ Play it here](https://salvar3nga.github.io/Quizz/)**

![Quizz Mei preview](public/og.png)

Built with **Svelte 5 + Vite + TypeScript**.

---

## ✨ Features

- **Categories**: General Knowledge, Geography, History, Science, Sports and IT
- **Play a single category** or **"I want 'em all!"**: 5 random questions from each category, against the clock
- **Question types**
  - ✅ Multiple choice
  - ✍️ Text input (typed answer)
  - 🖼️ Image-based (guess the country, city, flag, person, dish…)
- **Countdown timer** in the "all categories" mode, with a warning when time is running low
- **Randomized** question order and multiple choice options
- **Instant feedback** after each answer, then continue with Next or Enter
- **Detailed report** at the end: what you answered, the correct answer, and what you got right or wrong
- **Best scores** saved per category in your browser
- **Share your result**: copy it to the clipboard or use the native share sheet
- **Challenge a friend**: shared links open the same category, so they can try to beat your score
- 🎉 Confetti for a good run

---

## 🚀 Getting started

```bash
git clone https://github.com/salvar3nga/Quizz.git
cd Quizz
pnpm install
pnpm run dev
```

The app runs on <http://localhost:5173/Quizz/>.

### Scripts

| Command            | What it does                              |
| ------------------ | ----------------------------------------- |
| `pnpm run dev`     | Start the dev server                      |
| `pnpm run build`   | Production build into `dist/`             |
| `pnpm run preview` | Serve the production build locally        |
| `pnpm run check`   | Type-check Svelte and TypeScript          |
| `pnpm run test`    | Run the unit tests (Vitest)               |

---

## 🛠️ Configuring it to your liking

Everything you're likely to tweak lives in [`src/constants/`](src/constants):

- [`constants.ts`](src/constants/constants.ts): timer duration, questions per category, the low-time warning threshold, which categories can be played and which are included in "all", plus the arrays of end-of-quiz messages
- [`questions.ts`](src/constants/questions.ts): the questions themselves
- Images for image questions go in [`public/`](public)

Happy configuring ;)

---

## 🐞 Found a bug, a feature idea, or a wrong answer?

Please open an issue on the [GitHub Issues page](https://github.com/salvar3nga/Quizz/issues).

- Describe the bug or idea clearly
- Include steps to reproduce (for bugs)
- Screenshots or extra details are welcome!

Your feedback helps make this quiz better for everyone.

---

## ⭐ Enjoyed this project?

If you had fun or found the quiz useful, consider leaving a star on the repository. It really motivates further development. Many thanks!
