<script lang="ts">
  import CategorySelector from "./components/CategorySelector.svelte";
  import Question from "./components/Question.svelte";
  import Score from "./components/Score.svelte";
  import { quizFinished, currentCategory } from "./store/quizStore";
</script>

<main>
  {#if !$currentCategory}
    <CategorySelector />
  {:else if !$quizFinished}
    <Question />
  {:else}
    <Score />
  {/if}
</main>
