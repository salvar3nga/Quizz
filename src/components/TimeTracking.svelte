<script lang="ts">
  import {
    TIMER_DURATION,
    LOW_TIME_WARNING_THRESHOLD_IN_SECONDS,
  } from "../constants/constants";

  import { timeLeft } from "../store/quizStore";
</script>

<div class="timer-container">
  <div
    class={$timeLeft < LOW_TIME_WARNING_THRESHOLD_IN_SECONDS
      ? "low-time timer-bar"
      : "timer-bar"}
    style="width: {($timeLeft / TIMER_DURATION) * 100}%"
  ></div>
  <span
    class={$timeLeft < LOW_TIME_WARNING_THRESHOLD_IN_SECONDS
      ? "low-time-counter timer-counter"
      : "timer-counter"}>{$timeLeft}s</span
  >
</div>

<style>
  .timer-container {
    margin: 1rem 0;
    width: 100%;
    background-color: #f1f1f1;
    height: 1rem;
    border-radius: 5%;
    position: relative;

    .timer-bar {
      background-color: rgba(0, 187, 255, 0.462);
      height: 1rem;
      border-radius: 5%;
    }

    .timer-counter {
      position: absolute;
      right: 0;
      top: 0;
      transform: translateY(-100%);
      font-size: 0.75rem;
      color: rgb(0, 187, 255);
    }
    .low-time-counter {
      color: #fa2121;
    }
    .low-time {
      background-color: #dc2626;
    }
  }
</style>
