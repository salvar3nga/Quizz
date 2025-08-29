<script lang="ts">
  import { startQuiz } from "../store/quizStore";
  import { questions } from "../constants/questions";
  import type {Category} from "../constants/category";

  const categories : Category[] = ["General Knowledge", "Geography", "History", "Science"];

  function handleSelect(category: Category) {
    startQuiz(category, questions);
  }
</script>

<div class="flex flex-col gap-4">
  <h2>Select a Category</h2>
  {#each categories as category}
    <button on:click={() => handleSelect(category)}>{category}</button>
  {/each}
</div>
