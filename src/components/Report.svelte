<script lang="ts">
  import { onMount } from "svelte";
  import {
    answers,
    score,
    currentQuestions,
    currentCategory,
    startQuiz,
    resetGame,
  } from "../store/quizStore";
  import { questions } from "../constants/questions";
  import { getCorrectAnswer } from "../utils/answers";
  import { prefersReducedMotion } from "../utils/motion";

  import FinalMessage from "./FinalMessage.svelte";
  import Progress from "./Progress.svelte";
  import Icon from "./Icon.svelte";

  const allAnswers = $answers;
  const misses = allAnswers.filter((ans) => !ans.isCorrect);
  const rights = allAnswers.filter((ans) => ans.isCorrect);

  let shownScore = 0;
  let showRight = false;

  $: categoryLabel = $currentCategory === "All" ? "All categories" : $currentCategory;

  // Count the score up from 0
  onMount(() => {
    const target = $score;
    if (prefersReducedMotion() || target === 0) {
      shownScore = target;
      return;
    }

    const start = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / 700);
      shownScore = Math.round(target * (1 - (1 - progress) ** 3));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);
  });

  function playAgain() {
    if ($currentCategory) startQuiz($currentCategory, questions);
  }
</script>

<section class="report-container">
  <div class="card summary">
    <span class="kicker">{categoryLabel} · results</span>

    <div class="score">
      <span class="display score-value">{shownScore}</span>
      <span class="display score-total">/ {$currentQuestions.length}</span>
    </div>

    <Progress showCurrent={false} />
    <FinalMessage />

    <div class="actions">
      <button class="btn btn-accent press" on:click={playAgain}>
        <Icon name="replay" size={18} />
        Play again
      </button>
      <button class="btn btn-ghost press" on:click={resetGame}>Change category</button>
    </div>
  </div>

  {#if misses.length > 0}
    <section class="group">
      <h3 class="group-title">Missed · {misses.length}</h3>
      {#each misses as ans, i}
        <div class="answer-card rise" style:animation-delay="{120 + Math.min(i, 10) * 50}ms">
          {#if ans.question.type === "image"}
            <img src={ans.question.imageUrl} alt="" class="answer-image" />
          {/if}
          <div class="answer-body">
            <span class="answer-question">{ans.question.question}</span>
            <span class="answer-meta">
              {#if ans.userAnswer === null}
                <span>Ran out of time</span>
              {:else}
                <span>You said <s class="answer-incorrect">{ans.userAnswer}</s></span>
              {/if}
              <span>Answer <strong class="answer-correct">{getCorrectAnswer(ans.question)}</strong></span>
            </span>
          </div>
        </div>
      {/each}
    </section>
  {:else}
    <div class="answer-card perfect rise">Flawless. Nothing to review.</div>
  {/if}

  {#if rights.length > 0}
    <section class="group">
      <button
        class="btn-quiet press toggle"
        aria-expanded={showRight}
        on:click={() => (showRight = !showRight)}
      >
        Got right · {rights.length}
        <span class="chevron" class:open={showRight}><Icon name="chevronDown" size={16} /></span>
      </button>

      {#if showRight}
        {#each rights as ans, i}
          <div class="answer-card compact rise" style:animation-delay="{Math.min(i, 10) * 40}ms">
            <span class="mark mark-good"><Icon name="check" size={14} strokeWidth={2.5} /></span>
            <span class="answer-question">{ans.question.question}</span>
            <span class="answer-given">{ans.userAnswer}</span>
          </div>
        {/each}
      {/if}
    </section>
  {/if}
</section>

<style>
  .report-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .kicker {
    font-size: 14px;
    font-weight: 500;
    color: var(--muted);
  }

  .score {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }

  .score-value {
    font-size: clamp(80px, 15vw, 128px);
    font-weight: 800;
    line-height: 0.85;
    font-variant-numeric: tabular-nums;
  }

  .score-total {
    font-size: 36px;
    font-weight: 700;
    color: var(--muted);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .group-title {
    margin: 8px 0 0;
    font-size: 15px;
    font-weight: 600;
    color: var(--muted);
  }

  .answer-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px;
    border-radius: 18px;
    border: 1px solid var(--line);
    background: var(--card);
  }

  .answer-card.compact {
    padding: 12px 16px;
  }

  .answer-card.compact .mark {
    animation: none;
  }

  .answer-card.perfect {
    justify-content: center;
    font-weight: 500;
    color: var(--muted);
  }

  .answer-image {
    flex: none;
    width: 72px;
    height: 56px;
    border-radius: 10px;
    object-fit: cover;
  }

  .answer-body {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .answer-question {
    flex: 1;
    min-width: 0;
    font-weight: 600;
  }

  .compact .answer-question {
    font-weight: 500;
  }

  .answer-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 16px;
    font-size: 14px;
    color: var(--muted);
  }

  .answer-incorrect {
    color: var(--bad);
    font-weight: 600;
  }

  .answer-correct {
    color: var(--good);
  }

  .answer-given {
    font-size: 14px;
    color: var(--muted);
  }

  .toggle {
    align-self: flex-start;
    margin-left: -12px;
  }

  .chevron {
    display: inline-flex;
    transition: transform 200ms var(--ease-out);
  }

  .chevron.open {
    transform: rotate(180deg);
  }
</style>
