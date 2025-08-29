<script lang="ts">
  import { score, currentQuestions } from "../store/quizStore";
</script>

<div>
  <h2>Quiz Finished!</h2>
  <p>Your score: {$score} / {$currentQuestions.length}</p>
</div>
