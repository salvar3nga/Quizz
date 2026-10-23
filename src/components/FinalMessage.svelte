<script>
  import { getPercentage } from "../utils/percentage";
  import { score, currentQuestions } from "../store/quizStore";
  import { convertScoreToMessage } from "@/utils/converteScoreToMessage";
  import { shuffleArray } from "../utils/shuffle";

  // Picked once so the message doesn't change on re-render
  const percentage = getPercentage($score, $currentQuestions.length);
  const message = shuffleArray(convertScoreToMessage(percentage))[0];
</script>

<p class="display message">{message}</p>

<style>
  .message {
    margin: 0;
    max-width: 32ch;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.25;
  }
</style>
