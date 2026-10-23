<script lang="ts">
  import { onDestroy } from "svelte";
  import {
    currentCategory,
    score,
    answers,
    streak,
    resetGame,
  } from "../store/quizStore";
  import { fade } from "svelte/transition";
  import Progress from "./Progress.svelte";
  import Icon from "./Icon.svelte";

  const CONFIRM_QUIT_AFTER = 3;
  const SHOW_STREAK_FROM = 3;
  const CONFIRM_WINDOW_IN_MS = 3000;

  let confirmingQuit = false;
  let confirmTimeout: ReturnType<typeof setTimeout> | undefined;

  $: isTimed = $currentCategory === "All";

  function onQuit() {
    if (confirmingQuit || $answers.length < CONFIRM_QUIT_AFTER) {
      resetGame();
      return;
    }
    confirmingQuit = true;
    confirmTimeout = setTimeout(
      () => (confirmingQuit = false),
      CONFIRM_WINDOW_IN_MS,
    );
  }

  onDestroy(() => clearTimeout(confirmTimeout));
</script>

<header class="quiz-header">
  <div class="row">
    <button
      class="btn-quiet press quit"
      class:confirming={confirmingQuit}
      on:click={onQuit}
    >
      <Icon name="close" size={18} />
      <span aria-live="polite">{confirmingQuit ? "Leave round?" : "Quit"}</span>
    </button>

    <div class="category">
      <span class="category-name">
        {isTimed ? "All categories" : $currentCategory}
      </span>
      {#if isTimed}
        <span class="chip chip-sm"><Icon name="clock" size={14} /> Timed</span>
      {/if}
    </div>

    <div class="chips">
      {#if $streak >= SHOW_STREAK_FROM}
        <span
          class="chip"
          aria-label="{$streak} correct in a row"
          in:fade={{ duration: 150 }}
          out:fade={{ duration: 100 }}>🔥 {$streak}</span
        >
      {/if}
      <span class="chip" aria-label="{$score} correct so far">
        <span class="score-icon"
          ><Icon name="check" size={14} strokeWidth={2.5} /></span
        >
        {$score}
      </span>
    </div>
  </div>

  <Progress />
</header>

<style>
  .quiz-header {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .quit {
    margin-left: -12px;
    white-space: nowrap;
  }

  .quit.confirming,
  .quit.confirming:hover {
    color: var(--bad);
    background: var(--bad-bg);
  }

  .category {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .category-name {
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .chips {
    display: flex;
    gap: 6px;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 32px;
    padding: 0 12px;
    border-radius: 999px;
    border: 1px solid var(--line);
    background: var(--card);
    font-size: 14px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .chip-sm {
    height: 26px;
    padding: 0 10px;
    font-size: 13px;
  }

  .score-icon {
    display: inline-flex;
    color: var(--good);
  }
</style>
