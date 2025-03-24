import { Languages } from "@/constants";
import { generateMarkovChainText } from "@/lib/utils/ai-text-generator";
import { VISIBLE_WORDS_COUNT } from "../typing-test.constants";
import { generateText } from "@/lib/utils/text-generator/text-generator";
import { TypingParams } from "@/store/store";

export const generateTextByParams = async (
  typingParams: TypingParams,
  wordsCountOverride?: number
): Promise<string> => {
  let text;
  if (typingParams.mode === "ai") {
    text = await generateMarkovChainText(typingParams.sentences, Languages.RU);
  } else {
    const start = performance.now();
    const wordsCount = wordsCountOverride
      ? wordsCountOverride
      : typingParams.mode === "time"
      ? VISIBLE_WORDS_COUNT * 2
      : Math.min(typingParams.words, VISIBLE_WORDS_COUNT * 2);

    text = await generateText({
      punctuation: typingParams.punctuation,
      numbers: typingParams.numbers,
      language: Languages.RU,
      wordsCount: wordsCount,
      dictionarySize: 300000,
    });
    const end = performance.now();
    console.log(`Generated text in ${end - start} ms`);
  }

  return text;
};
