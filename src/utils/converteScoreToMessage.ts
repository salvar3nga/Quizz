import { FINAL_MESSAGES } from "@/constants/constants";
import { FinalMessageKey } from "@/constants/finalMessage";

export function convertScoreToMessage(score: number): string[] {
  if (score === FinalMessageKey.ZERO)
    return FINAL_MESSAGES[FinalMessageKey.ZERO as keyof typeof FINAL_MESSAGES];
  if (score > FinalMessageKey.ZERO && score < FinalMessageKey.TWENTY)
    return FINAL_MESSAGES[
      FinalMessageKey.TWENTY as keyof typeof FINAL_MESSAGES
    ];
  if (score >= FinalMessageKey.TWENTY && score < FinalMessageKey.FIFTY)
    return FINAL_MESSAGES[
      FinalMessageKey.TWENTY as keyof typeof FINAL_MESSAGES
    ];
  if (score >= FinalMessageKey.FIFTY && score < FinalMessageKey.EIGHTY)
    return FINAL_MESSAGES[FinalMessageKey.FIFTY as keyof typeof FINAL_MESSAGES];
  if (score >= FinalMessageKey.EIGHTY && score < FinalMessageKey.HUNDRED)
    return FINAL_MESSAGES[
      FinalMessageKey.EIGHTY as keyof typeof FINAL_MESSAGES
    ];
  if (score === FinalMessageKey.HUNDRED)
    return FINAL_MESSAGES[
      FinalMessageKey.HUNDRED as keyof typeof FINAL_MESSAGES
    ];
  return [""];
}
