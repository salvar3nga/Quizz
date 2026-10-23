<script lang="ts">
  import {
    currentQuestions,
    currentIndex,
    currentCategory,
    answers,
    revealed,
    timeLeft,
    submitAnswer,
    nextQuestion,
    resetGame,
  } from "../store/quizStore";
  import { LOW_TIME_WARNING_THRESHOLD_IN_SECONDS } from "../constants/constants";
  import { isTypedAnswerCorrect, getCorrectAnswer } from "../utils/answers";
  import { rise, focusOnMount } from "../utils/motion";

  import Input from "./Input.svelte";
  import TimeTracking from "./TimeTracking.svelte";
  import QuestionCounter from "./QuestionCounter.svelte";
  import Icon from "./Icon.svelte";

  const CORRECT_TITLES = ["Correct!", "Nailed it.", "Yep, that’s it."];

  let userInput = "";
  let selected: number | null = null;
  let input: Input;

  $: question = $currentQuestions[$currentIndex];
  $: isTimed = $currentCategory === "All";
  $: isLast = $currentIndex + 1 >= $currentQuestions.length;
  $: lastAnswer = $revealed ? $answers[$answers.length - 1] : null;
  $: status = !lastAnswer
    ? null
    : lastAnswer.userAnswer === null
      ? "timeout"
      : lastAnswer.isCorrect
        ? "correct"
        : "incorrect";

  function checkMcAnswer(selectedAnswer: number) {
    if ($revealed) return;
    selected = selectedAnswer;
    submitAnswer(
      question.options![selectedAnswer],
      String(selectedAnswer) === question.answer
    );
  }

  function checkTypedAnswer() {
    if ($revealed) return;
    if (!userInput.trim()) {
      input.nudge(4);
      return;
    }

    const isCorrect = isTypedAnswerCorrect(question, userInput);
    submitAnswer(userInput.trim(), isCorrect);
    if (!isCorrect) input.nudge();
  }

  function goToNextQuestion() {
    selected = null;
    userInput = "";
    nextQuestion();
  }

  // 1–4 answers multiple choice questions
  function onKeydown(e: KeyboardEvent) {
    if ($revealed || question?.type !== "mcq") return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const option = Number(e.key);
    if (Number.isInteger(option) && option >= 1 && option <= question.options!.length) {
      checkMcAnswer(option - 1);
    }
  }
</script>

<svelte:window on:keydown={onKeydown} />

{#if $currentQuestions.length === 0}
  <div class="card empty">
    <p>
      I'm cooking up some questions for this category.... Come back some time
      later!
    </p>
    <button class="btn btn-accent press" on:click={resetGame}>Home</button>
  </div>
{:else if question}
  <div class="card">
    {#if isTimed}
      <TimeTracking />
    {/if}

    {#key $currentIndex}
      <div class="question" in:rise={{ y: 8, blur: 2, duration: 240 }}>
        <div class="kicker">
          <QuestionCounter />
          {#if isTimed}
            <span
              class="seconds"
              class:low-time={$timeLeft <= LOW_TIME_WARNING_THRESHOLD_IN_SECONDS}
              >{$timeLeft}s</span
            >
          {/if}
        </div>

        {#if question.type === "image"}
          <img src={question.imageUrl} alt="What this question asks about" class="image" />
        {/if}

        <h2 class="display title">{question.question}</h2>

        {#if question.type === "mcq"}
          <div class="options">
            {#each question.options! as option, i}
              {@const isAnswer = String(i) === question.answer}
              <button
                class="option press"
                class:correct={$revealed && isAnswer}
                class:incorrect={$revealed && !isAnswer && selected === i}
                class:dimmed={$revealed && !isAnswer && selected !== i}
                disabled={$revealed}
                on:click={() => checkMcAnswer(i)}
              >
                {#if $revealed && isAnswer}
                  <span class="mark mark-good"><Icon name="check" size={14} strokeWidth={2.5} /></span>
                {:else if $revealed && selected === i}
                  <span class="mark mark-bad"><Icon name="close" size={14} strokeWidth={2.5} /></span>
                {:else}
                  <span class="kbd">{i + 1}</span>
                {/if}
                <span>{option}</span>
              </button>
            {/each}
          </div>
          {#if !$revealed}
            <span class="hint">Press 1 to {question.options!.length} to answer</span>
          {/if}
        {:else}
          <Input
            bind:this={input}
            bind:typedAnswer={userInput}
            disabled={$revealed}
            status={status === "correct" ? "correct" : status ? "incorrect" : null}
            onCheckAnswer={checkTypedAnswer}
          />
        {/if}

        {#if status}
          <div class="reveal">
            <div class="result" class:result-correct={status === "correct"} role="status">
              <span class="mark mark-lg" class:mark-good={status === "correct"} class:mark-bad={status !== "correct"}>
                <Icon name={status === "correct" ? "check" : "close"} size={16} strokeWidth={2.5} />
              </span>
              <span class="result-text">
                <strong>
                  {status === "correct"
                    ? CORRECT_TITLES[$currentIndex % CORRECT_TITLES.length]
                    : status === "timeout"
                      ? "Time’s up."
                      : "Not quite."}
                </strong>
                {#if status !== "correct" && question.type !== "mcq"}
                  <span class="result-answer">Answer: <strong>{getCorrectAnswer(question)}</strong></span>
                {/if}
              </span>
            </div>
            <button class="btn btn-accent press" use:focusOnMount on:click={goToNextQuestion}>
              {isLast ? "See results" : "Next"}
              <span class="kbd" aria-hidden="true">↵</span>
            </button>
          </div>
        {/if}
      </div>
    {/key}
  </div>
{/if}

<style>
  .empty {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .empty p {
    margin: 0;
    font-size: 18px;
  }

  .question {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .kicker {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: var(--muted);
  }

  .seconds {
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .seconds.low-time {
    color: var(--bad);
  }

  .image {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    border-radius: 16px;
  }

  .title {
    margin: 0;
    font-size: clamp(26px, 4.4vw, 36px);
    line-height: 1.15;
    font-weight: 700;
  }

  .options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 10px;
  }

  .option {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    min-height: 64px;
    padding: 14px 16px;
    border-radius: 16px;
    border: 1.5px solid var(--line);
    background: var(--card);
    text-align: left;
    font-size: 17px;
    font-weight: 500;
  }

  .option:disabled {
    cursor: default;
  }

  .option.correct {
    border-color: var(--good);
    background: var(--good-bg);
  }

  .option.incorrect {
    border-color: var(--bad);
    background: var(--bad-bg);
  }

  .option.dimmed {
    opacity: 0.4;
  }

  .hint {
    margin-top: -12px;
    font-size: 13px;
    color: var(--muted);
  }

  .reveal {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
  }

  .result {
    flex: 1 1 260px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 16px;
    background: var(--bad-bg);
    animation: rise 260ms var(--ease-out) both;
  }

  .result-correct {
    background: var(--good-bg);
  }

  .result-text {
    display: flex;
    flex-direction: column;
    line-height: 1.35;
  }

  .result-answer {
    font-size: 14px;
  }

  @media (hover: hover) and (pointer: fine) {
    .option:not(:disabled):hover {
      border-color: var(--ink);
    }
  }

  /* No keyboard on touch devices, so the 1–4 hint is noise there */
  @media (hover: none) {
    .hint {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .result {
      animation-name: fade;
    }
  }
</style>
