import { Languages } from "@/constants";
import { generateMarkovChainText } from "@/lib/utils/ai-text-generator";
import { generateText } from "@/lib/utils/text-generator";
import { useStore } from "@/store/store";
import { useCallback } from "react";
import { VISIBLE_WORDS_COUNT } from "../../typing-test.constants";
import { clamp } from "@/lib/utils";

export const useReloadTest = () => {
  const updateNeedText = useStore((state) => state.updateNeedText);
  const updateTypedText = useStore((state) => state.updateTypedText);
  const updateTestRealoading = useStore((state) => state.updateTestRealoading);
  const setStartTestTime = useStore((state) => state.setStartTestTime);
  const setEndTestTime = useStore((state) => state.setEndTestTime);
  const updateTestEnd = useStore((state) => state.updateTestEnd);

  const reloadTest = useCallback(
    async (retry: boolean = false) => {
      const { isTestReloading, typingParams } = useStore.getState();

      if (isTestReloading) return;

      updateTestRealoading(true);

      updateTestRealoading(true);
      setStartTestTime(0);
      setEndTestTime(0);
      updateTestEnd(false);

      if (!retry) {
        let text;

        if (typingParams.mode === "ai") {
          text = await generateMarkovChainText(
            typingParams.sentences,
            Languages.RU
          );
        } else {
          text = await generateText({
            punctuation: typingParams.punctuation,
            numbers: typingParams.numbers,
            language: Languages.RU,
            wordsCount:
              typingParams.mode === "time"
                ? clamp(typingParams.time * 2, VISIBLE_WORDS_COUNT * 1.5, 10000)
                : typingParams.words,
            dictionarySize: 300000,
          });
        }

        updateNeedText(text);
      }
      updateTypedText("");
      updateTestRealoading(false);
    },
    [
      updateNeedText,
      updateTestRealoading,
      updateTypedText,
      setStartTestTime,
      setEndTestTime,
      updateTestEnd,
    ]
  );


  return reloadTest;
};
