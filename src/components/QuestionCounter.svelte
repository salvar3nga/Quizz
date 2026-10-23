<script>
  import { currentIndex, currentQuestions } from "../store/quizStore";
</script>

<span>Question {$currentIndex + 1} of {$currentQuestions.length}</span>
