<script lang="ts">
  import {
    currentQuestions,
    currentIndex,
    score,
    nextQuestion,
    timeLeft,
  } from "../store/quizStore";
  import { currentCategory } from "../store/quizStore";

  let question = $currentQuestions[$currentIndex];
  let category = $currentCategory;

  function selectAnswer(index: number) {
    if (index === question.answer) {
      score.update((n) => n + 1);
    }

    nextQuestion();
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
    <div class="timer-container">
      <div class="timer-bar" style="width: {($timeLeft / 15) * 100}%"></div>
    </div>
    <div class="question-options">
      {#each question.options as option, i}
        <button on:click={() => selectAnswer(i)}>{option}</button>
      {/each}
    </div>
  </div>
{/if}

<style>
  .timer-container {
    margin: 1rem 0;
    width: 100%;
    background-color: #f1f1f1;
    height: 1rem;
    border-radius: 5%;

    .timer-bar {
      background-color: rgba(0, 187, 255, 0.462);
      height: 1rem;
      border-radius: 5%;
    }
  }
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
