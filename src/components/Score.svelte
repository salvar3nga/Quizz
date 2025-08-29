<script lang="ts">
  import { score, currentQuestions, currentCategory } from "../store/quizStore";
</script>

<div>
  <h2>Quiz Finished!</h2>
  <p>Your score: {$score} / {$currentQuestions.length}</p>
  <button on:click={() => currentCategory.set(null)}>Home</button>
</div>
