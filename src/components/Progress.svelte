<script lang="ts">
  import {
    answers,
    currentQuestions,
    currentIndex,
    score,
  } from "../store/quizStore";

  export let showCurrent = true;

  $: label = `${$answers.length} of ${$currentQuestions.length} answered, ${$score} correct`;
</script>

<div
  class="progress"
  class:dense={$currentQuestions.length > 20}
  role="img"
  aria-label={label}
>
  {#each $currentQuestions as _, i}
    <span
      class="segment"
      class:correct={$answers[i]?.isCorrect}
      class:incorrect={$answers[i] && !$answers[i].isCorrect}
      class:current={showCurrent && !$answers[i] && i === $currentIndex}
    ></span>
  {/each}
</div>

<style>
  .progress {
    display: flex;
    gap: 6px;
  }

  .progress.dense {
    gap: 3px;
  }

  .segment {
    flex: 1;
    height: 6px;
    border-radius: 999px;
    background: var(--line);
    transition: background-color 200ms ease;
  }

  .current {
    background: var(--muted);
  }

  .correct {
    background: var(--good);
  }

  .incorrect {
    background: var(--bad);
  }
</style>
