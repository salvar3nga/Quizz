<script lang="ts">
  import { startQuiz } from "../store/quizStore";
  import { questions } from "../constants/questions";
  import type { Category } from "../constants/category";
  import {
    CATEGORIES_TO_PLAY,
    CATEGORIES_TO_INCLUDE_ON_ALL_CATEGORIES,
    MAX_QUESTIONS_PER_CATEGORY,
    MAX_QUESTIONS_IN_ALL_CATEGORIES,
    TIMER_DURATION,
  } from "../constants/constants";
  import Icon, { type IconName } from "./Icon.svelte";

  const CATEGORY_ICONS: Record<Category, IconName> = {
    "General Knowledge": "bulb",
    Geography: "globe",
    History: "columns",
    Science: "flask",
    Sports: "ball",
    IT: "terminal",
    All: "bolt",
  };

  const countFor = (category: Category, max: number) =>
    Math.min(questions.filter((q) => q.category === category).length, max);

  const categories = CATEGORIES_TO_PLAY.map((category) => ({
    category,
    count: countFor(category, MAX_QUESTIONS_PER_CATEGORY),
  }));

  const allCount = CATEGORIES_TO_INCLUDE_ON_ALL_CATEGORIES.reduce(
    (sum, category) =>
      sum + countFor(category, MAX_QUESTIONS_IN_ALL_CATEGORIES),
    0,
  );

  function onCategorySelect(category: Category) {
    startQuiz(category, questions);
  }
</script>

<section class="home">
  <div class="intro">
    <h1 class="display">Pick your poison.</h1>
    <p>
      Tap it, type it, or name what's in the picture. A verdict waits at the
      end.
    </p>
  </div>

  <div class="grid">
    {#each categories as { category, count }, i}
      <button
        class="category press rise"
        style:animation-delay="{40 + i * 45}ms"
        on:click={() => onCategorySelect(category)}
      >
        <span class="category-icon">
          <Icon name={CATEGORY_ICONS[category]} size={22} />
        </span>
        <span class="category-text">
          <span class="category-name">{category}</span>
          <span class="category-count">{count} questions</span>
        </span>
        <span class="category-arrow"><Icon name="arrowRight" size={18} /></span>
      </button>
    {/each}
  </div>

  <button
    class="bring-it-on press rise"
    style:animation-delay="{40 + categories.length * 45}ms"
    on:click={() => onCategorySelect("All")}
  >
    <span class="bring-it-on-icon"><Icon name="bolt" size={24} /></span>
    <span class="category-text">
      <span class="display bring-it-on-title">I want 'em all!</span>
      <span class="bring-it-on-meta">
        {allCount} questions from every category, {TIMER_DURATION} seconds each
      </span>
    </span>
    <Icon name="arrowRight" size={22} />
  </button>
</section>

<style>
  .home {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .intro {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 28px 0 12px;
  }

  h1 {
    margin: 0;
    font-size: clamp(40px, 7vw, 64px);
    line-height: 1;
    font-weight: 800;
  }

  .intro p {
    margin: 0;
    max-width: 46ch;
    font-size: 18px;
    color: var(--muted);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
  }

  .category {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
    min-height: 136px;
    padding: 18px;
    border-radius: 18px;
    border: 1px solid var(--line);
    background: var(--card);
    text-align: left;
  }

  .category-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: var(--soft);
  }

  .category-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .category-name {
    font-size: 17px;
    font-weight: 600;
  }

  .category-count {
    font-size: 14px;
    color: var(--muted);
  }

  .category-arrow {
    position: absolute;
    top: 20px;
    right: 18px;
    display: flex;
    color: var(--muted);
    opacity: 0.5;
    transition:
      transform 200ms var(--ease-out),
      opacity 150ms ease;
  }

  .bring-it-on {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    padding: 20px;
    border: 0;
    border-radius: 20px;
    background: var(--accent);
    color: var(--on-accent);
    text-align: left;
  }

  .bring-it-on .category-text {
    flex: 1;
  }

  .bring-it-on-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: var(--on-accent);
    color: var(--accent);
  }

  .bring-it-on-title {
    font-size: 22px;
    font-weight: 800;
    line-height: 1.2;
  }

  .bring-it-on-meta {
    font-size: 15px;
    font-weight: 500;
  }

  @media (max-width: 600px) {
    .intro {
      padding: 12px 0 4px;
    }

    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }

    .category {
      gap: 12px;
      min-height: 0;
      padding: 14px;
    }

    .category-arrow {
      display: none;
    }

    .category-name {
      font-size: 16px;
      line-height: 1.3;
    }

    .bring-it-on {
      padding: 16px;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .category:hover {
      border-color: var(--ink);
    }

    .category:hover .category-arrow {
      transform: translateX(3px);
      opacity: 1;
    }

    .bring-it-on:hover {
      background: color-mix(in oklab, var(--accent) 90%, #000);
    }
  }
</style>
