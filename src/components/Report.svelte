<script lang="ts">
  import {
    answers,
    score,
    currentQuestions,
    resetGame,
  } from "../store/quizStore";

  let allAnswers = $answers;
</script>

<div class="report-container">
  <div>
    <h2 class="report-title">Let's how you did</h2>
    <p>Your score: {$score} / {$currentQuestions.length}</p>
  </div>

  <div class="answers-container">
    {#each allAnswers as ans, i}
      <div class="answer-card">
        <h3 class="answer-question">{i + 1}. {ans.question.question}</h3>

        {#if ans.question.type === "image"}
          <img src={ans.question.imageUrl} alt="" class="answer-image" />
        {/if}

        <p>
          Your answer:
          <span class={ans.isCorrect ? "answer-correct" : "answer-incorrect"}>
            {ans.userAnswer}
          </span>
        </p>

        <p>
          Correct answer: <span class="answer-right"
            >{ans.question.type === "mcq"
              ? ans.question.options[ans.question.answer]
              : Array.isArray(ans.question.answer)
                ? ans.question.answer[0]
                : ans.question.answer}</span
          >
        </p>
      </div>
    {/each}
  </div>
  <button on:click={() => resetGame()}>Home</button>
</div>

<style>
  .report-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .report-title {
    font-size: 1.25rem;
    font-weight: bold;
  }

  .answers-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .answer-card {
    padding: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    background: #1c1c1c;
  }

  .answer-question {
    font-weight: 600;
  }

  .answer-image {
    width: 16rem;
    height: 10rem;
    object-fit: cover;
    border-radius: 0.5rem;
    margin: 0.5rem 0;
  }

  .answer-correct {
    color: #16a34a;
    font-weight: 600;
  }

  .answer-incorrect {
    color: #dc2626;
    font-weight: 600;
  }

  .answer-right {
    font-weight: 600;
  }
</style>
