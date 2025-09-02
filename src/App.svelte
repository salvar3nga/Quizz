<script lang="ts">
  import CategorySelector from "./components/CategorySelector.svelte";
  import Question from "./components/Question.svelte";
  import Report from "./components/Report.svelte";
  import QuestionCounter from "./components/QuestionCounter.svelte";
  import { quizFinished, currentCategory } from "./store/quizStore";
</script>

<main>
  {#if !$currentCategory}
    <CategorySelector />
  {:else if !$quizFinished}
    <QuestionCounter />
    <Question />
  {:else}
    <Report />
  {/if}
</main>
