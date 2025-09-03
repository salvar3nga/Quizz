<script>
  import { getPercentage } from "../utils/percentage";
  import { score, currentQuestions } from "../store/quizStore";
  import { convertScoreToMessage } from "@/utils/converteScoreToMessage";
  import { shuffleArray } from "../utils/shuffle";

  $: percentage = getPercentage($score, $currentQuestions.length);
</script>

<div class="message">
  {shuffleArray(convertScoreToMessage(percentage))[0]}
</div>

<style>
  .message {
    font-size: 1.5rem;
  }
</style>
