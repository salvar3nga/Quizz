<script lang="ts">
  import { currentCategory, score, resetGame } from "../store/quizStore";
  import Progress from "./Progress.svelte";
  import Icon from "./Icon.svelte";

  $: isTimed = $currentCategory === "All";
</script>

<header class="quiz-header">
  <div class="row">
    <button class="btn-quiet press quit" on:click={resetGame}>
      <Icon name="close" size={18} />
      Quit
    </button>

    <div class="category">
      <span class="category-name">
        {isTimed ? "All categories" : $currentCategory}
      </span>
      {#if isTimed}
        <span class="chip chip-sm"><Icon name="clock" size={14} /> Timed</span>
      {/if}
    </div>

    <span class="chip" aria-label="{$score} correct so far">
      <span class="score-icon"><Icon name="check" size={14} strokeWidth={2.5} /></span>
      {$score}
    </span>
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
