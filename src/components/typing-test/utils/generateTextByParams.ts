import { Languages } from "@/constants";
import { generateMarkovChainText } from "@/lib/utils/ai-text-generator";
import { VISIBLE_WORDS_COUNT } from "../typing-test.constants";
import { clamp } from "@/lib/utils";
import { generateText } from "@/lib/utils/text-generator";
import { TypingParams } from "@/store/store";

export const generateTextByParams = async (
  typingParams: TypingParams,
  wordsCountOverride?: number
): Promise<string> => {
  let text;
  if (typingParams.mode === "ai") {
    text = await generateMarkovChainText(typingParams.sentences, Languages.RU);
  } else {
    const wordsCount = wordsCountOverride
      ? wordsCountOverride
      : typingParams.mode === "time"
      ? clamp(typingParams.time * 2, VISIBLE_WORDS_COUNT * 1.5, 10000)
      : Math.min(typingParams.words, VISIBLE_WORDS_COUNT * 2);

    text = await generateText({
      punctuation: typingParams.punctuation,
      numbers: typingParams.numbers,
      language: Languages.RU,
      wordsCount: wordsCount,
      dictionarySize: 300000,
    });
  }

  return text;
};
