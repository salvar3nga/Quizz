<script lang="ts">
  import {
    currentQuestions,
    currentIndex,
    score,
    quizFinished,
  } from "../store/quizStore";
  import { currentCategory } from "../store/quizStore";

  let question = $currentQuestions[$currentIndex];
  let category = $currentCategory;

  function selectAnswer(index: number) {
    if (index === question.answer) {
      score.update((n) => n + 1);
    }

    if ($currentIndex + 1 < $currentQuestions.length) {
      currentIndex.update((n) => n + 1);
    } else {
      quizFinished.set(true);
    }
  }

  $: question = $currentQuestions[$currentIndex];
</script>

{#if $currentQuestions.length === 0}
  <p>
    I'm cooking up some questions for this category.... Come back some time
    later!
  </p>
  <button on:click={() => currentCategory.set(null)}>Home</button>
{:else if question}
  <div>
    <h2>{question.question}</h2>
    <div class="question-options">
      {#each question.options as option, i}
        <button on:click={() => selectAnswer(i)}>{option}</button>
      {/each}
    </div>
  </div>
{/if}

<style>
  .question-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  @media (max-width: 600px) {
    .question-options {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
</style>
