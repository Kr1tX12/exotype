import { Languages } from "@/constants";
import { generateMarkovChainText } from "@/lib/utils/ai-text-generator";
import { generateText } from "@/lib/utils/text-generator";
import { useStore } from "@/store/store";
import { useCallback, useEffect } from "react";
import { VISIBLE_WORDS_COUNT } from "../../typing-test.constants";

export const useReloadTest = () => {
  const updateNeedText = useStore((state) => state.updateNeedText);
  const updateTypedText = useStore((state) => state.updateTypedText);
  const updateTestRealoading = useStore((state) => state.updateTestRealoading);

  const typingParams = useStore((state) => state.typingParams);

  const reloadTest = useCallback(async () => {
    const { isTestReloading, typingParams } = useStore.getState();

    if (isTestReloading) return;

    updateTestRealoading(true);

    let text;

    if (typingParams.mode === "ai") {
      text = await generateMarkovChainText(typingParams.words, Languages.RU);
    } else {
      text = await generateText({
        punctuation: false,
        numbers: false,
        language: Languages.RU,
        wordsCount: typingParams.mode === 'time' ? Math.max(1, VISIBLE_WORDS_COUNT * 2) : typingParams.words,
        dictionarySize: 250,
      });
    }

    updateNeedText(text);
    updateTypedText("");

    updateTestRealoading(false);
  }, [updateNeedText, updateTestRealoading, updateTypedText]);

  useEffect(() => {
    reloadTest();
  }, [typingParams, reloadTest]);

  return reloadTest;
};
