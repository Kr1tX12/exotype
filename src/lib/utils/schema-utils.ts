import { TypingParams } from "@/store/store";

export const getTestValue = (typingParams: TypingParams) => {
  switch (typingParams.mode) {
    case "time":
      return typingParams.time;
    case "ai":
      return typingParams.sentences;
    case "words":
      return typingParams.words;
    default:
      return 0;
  }
};
