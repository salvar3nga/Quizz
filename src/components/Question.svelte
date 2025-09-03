<script lang="ts">
  import {
    currentQuestions,
    currentIndex,
    score,
    nextQuestion,
    currentCategory,
    recordAnswer,
  } from "../store/quizStore";

  import Input from "./Input.svelte";
  import Button from "./Button.svelte";
  import TimeTracking from "./TimeTracking.svelte";
  import { get } from "svelte/store";

  let question = $currentQuestions[$currentIndex];
  let userInput = "";
  let selected: number | null = null;
  let isLocked: boolean = false;
  let isTypedAnswerCorrect: boolean | null = null;

  function checkMcAnswer(selectedAnswer: number) {
    if (isLocked) return;
    selected = selectedAnswer;
    isLocked = true;

    const isCorrect = String(selectedAnswer) === question.answer;

    if (isCorrect) {
      score.update((n) => n + 1);
    }

    const convertedAnswer = question.options![selectedAnswer];

    recordAnswer(question, convertedAnswer, isCorrect);
    delayNextQuestionReveal();
  }

  function checkTypedAnswer() {
    if (isLocked) return;
    isLocked = true;

    if (Array.isArray(question.answer)) {
      if (
        question.answer
          .map((ans: string) => ans.trim().toLocaleLowerCase())
          .includes(userInput.trim().toLocaleLowerCase())
      ) {
        isTypedAnswerCorrect = true;
        score.update((n) => n + 1);
        recordAnswer(question, userInput, true);
      } else {
        isTypedAnswerCorrect = false;
        recordAnswer(question, userInput, false);
      }
    } else {
      if (
        userInput.trim().toLocaleLowerCase() ===
        question.answer.trim().toLocaleLowerCase()
      ) {
        isTypedAnswerCorrect = true;
        score.update((n) => n + 1);
        recordAnswer(question, userInput, true);
      } else {
        isTypedAnswerCorrect = false;
        recordAnswer(question, userInput, false);
      }
    }
    delayNextQuestionReveal(500);
  }

  function delayNextQuestionReveal(delayInMS: number = 500) {
    setTimeout(() => {
      selected = null;
      isLocked = false;
      userInput = "";
      isTypedAnswerCorrect = null;
      nextQuestion();
    }, delayInMS);
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
    {#if get(currentCategory) === "All"}
      <TimeTracking />
    {/if}
    {#if question.type === "mcq"}
      <div class="question-options">
        {#each question.options! as option, i}
          <button
            on:click={() => checkMcAnswer(i)}
            class={selected === i && isLocked
              ? String(selected) === question.answer
                ? "correct"
                : "incorrect"
              : ""}>{option}</button
          >
        {/each}
      </div>
    {:else if question.type === "text"}
      <div class="input-container">
        <Input bind:typedAnswer={userInput} onCheckAnswer={checkTypedAnswer} />
        <Button onClick={checkTypedAnswer} />
      </div>
    {:else if question.type === "image"}
      <div class="image-container">
        <img src={question.imageUrl} alt="" class="image" />
        <div class="input-container">
          <Input
            bind:typedAnswer={userInput}
            onCheckAnswer={checkTypedAnswer}
          />
          <Button onClick={checkTypedAnswer} />
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  img {
    max-inline-size: 100%;
  }

  .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
  }
  .question-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .correct {
    background-color: #16a34a;
    color: white;
  }

  .incorrect {
    background-color: #dc2626;
    color: white;
  }

  @media (max-width: 600px) {
    .question-options {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
</style>
