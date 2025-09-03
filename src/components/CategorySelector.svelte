<script lang="ts">
  import { startQuiz } from "../store/quizStore";
  import { questions } from "../constants/questions";
  import type { Category } from "../constants/category";
  import { CATEGORIES_TO_PLAY } from "../constants/constants";
  const categories: Category[] = CATEGORIES_TO_PLAY;

  function onCategorySelect(category: Category) {
    startQuiz(category, questions);
  }
</script>

<div class="category-selector">
  <h2>Select a Category</h2>
  {#each categories as category}
    <button on:click={() => onCategorySelect(category)}>{category}</button>
  {/each}
  <hr />
  <button class="bring-it-on" on:click={() => onCategorySelect("All")}
    >I want 'em all!</button
  >
</div>

<style>
  .category-selector {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .bring-it-on {
    margin-top: 1rem;
    background-color: #ff4000b3;
    color: white;
  }

  .bring-it-on:hover {
    background-color: #ff4000db;
    color: white;
    border-color: #000;
  }
</style>
