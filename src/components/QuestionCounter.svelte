<script>
  import { currentIndex, currentQuestions } from "../store/quizStore";
</script>

<div class="question-counter">
  Question {$currentIndex + 1} of {$currentQuestions.length}
</div>

<style>
  .question-counter {
    font-size: 1.2em;
    margin-bottom: 1em;
  }
</style>
