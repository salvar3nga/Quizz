<script lang="ts">
  import {
    TIMER_DURATION,
    LOW_TIME_WARNING_THRESHOLD_IN_SECONDS,
  } from "../constants/constants";

  import { timeLeft } from "../store/quizStore";
</script>

<div class="timer" aria-hidden="true">
  <div
    class="timer-bar"
    class:low-time={$timeLeft <= LOW_TIME_WARNING_THRESHOLD_IN_SECONDS}
    class:refill={$timeLeft === TIMER_DURATION}
    style:transform="scaleX({$timeLeft / TIMER_DURATION})"
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
    transition:
      transform 1s linear,
      background-color 200ms ease;
  }

  /* A new question refills the bar instantly instead of sweeping backwards */
  .refill {
    transition: none;
  }

  .low-time {
    background: var(--bad);
  }

  @media (prefers-reduced-motion: reduce) {
    .timer-bar {
      transition: background-color 200ms ease;
    }
  }
</style>
