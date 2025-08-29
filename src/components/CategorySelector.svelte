<script lang="ts">
  import { startQuiz } from "../store/quizStore";
  import { questions } from "../constants/questions";
  import type { Category } from "../constants/category";

  const categories: Category[] = [
    "General Knowledge",
    "Geography",
    "History",
    "Science",
  ];

  function handleSelect(category: Category) {
    startQuiz(category, questions);
  }
</script>

<div class="category-selector">
  <h2>Select a Category</h2>
  {#each categories as category}
    <button on:click={() => handleSelect(category)}>{category}</button>
  {/each}
</div>

<style>
  .category-selector {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
