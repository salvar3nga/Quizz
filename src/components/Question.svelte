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
  let userInput = "";

  function checkAnswer(selectedAnswer?: number) {
    if (question.type === "mcq") {
      if (String(selectedAnswer) === question.answer)
        score.update((n) => n + 1);
    } else {
      if (
        userInput.trim().toLocaleLowerCase() ===
        question.answer.trim().toLocaleLowerCase()
      ) {
        score.update((n) => n + 1);
      }
    }
    userInput = "";
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
    {#if question.type === "mcq"}
      <div class="question-options">
        {#each question.options as option, i}
          <button on:click={() => checkAnswer(i)}>{option}</button>
        {/each}
      </div>
    {:else if question.type === "text"}
      <div>
        <input
          bind:value={userInput}
          on:keydown={(e) => e.key === "Enter" && checkAnswer()}
          placeholder="Type your answer..."
        />
        <button on:click={() => checkAnswer()}>Submit</button>
      </div>
    {:else if question.type === "image"}
      <div class="image-container">
        <img
          src={question.imageUrl}
          alt=""
          class="w-64 h-40 object-cover rounded shadow image"
        />
        <input
          bind:value={userInput}
          on:keydown={(e) => e.key === "Enter" && checkAnswer()}
          placeholder="Your answer..."
        />
        <button on:click={() => checkAnswer()}>Submit</button>
      </div>
    {/if}
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

  .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    input {
      font-size: 1.5rem;
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
