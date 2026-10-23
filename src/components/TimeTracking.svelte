<script lang="ts">
  import {
    TIMER_DURATION,
    LOW_TIME_WARNING_THRESHOLD_IN_SECONDS,
  } from "../constants/constants";

  import { timeLeft, currentIndex, revealed } from "../store/quizStore";

  let bar: HTMLDivElement;
  let animation: Animation | undefined;

  function restart(_index: number) {
    animation?.cancel();
    animation = bar.animate(
      [{ transform: "scaleX(1)" }, { transform: "scaleX(0)" }],
      { duration: TIMER_DURATION * 1000, easing: "linear", fill: "forwards" },
    );
  }

  $: if (bar) restart($currentIndex);
  $: if ($revealed) animation?.pause();
</script>

<div class="timer" aria-hidden="true">
  <div
    bind:this={bar}
    class="timer-bar"
    class:low-time={$timeLeft <= LOW_TIME_WARNING_THRESHOLD_IN_SECONDS}
  ></div>
</div>

<style>
  .timer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--soft);
  }

  .timer-bar {
    height: 100%;
    background: var(--accent);
    transform-origin: left center;
    transition: background-color 200ms ease;
  }

  .low-time {
    background: var(--bad);
  }
</style>
