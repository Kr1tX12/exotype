import { useStore } from "@/store/store";
import { useCallback, useEffect } from "react";
import { VISIBLE_WORDS_COUNT } from "../../typing-test.constants";
import { generateTextByParams } from "../../utils/generateTextByParams";
import { useTypingState } from "../../components/typing-provider";

export const useTimeTest = () => {
  const typedWords = useTypingState((state) => state.typedWords);
  const targetWords = useTypingState((state) => state.targetWords);

  const targetText = useStore((state) => state.targetText);
  const updateTargetText = useStore((state) => state.updateTargetText);
  const startTestTime = useStore((state) => state.startTestTime);
  const typingParams = useStore((state) => state.typingParams);
  const updateTestEnd = useStore((state) => state.updateTestEnd);

  const checkTestEnd = useCallback(() => {
    if (typingParams.mode !== "time") return;

    const hasTestEnded = isTestEnd(startTestTime, typingParams.time);

    if (hasTestEnded) {
      updateTestEnd(true);
    }
  }, [startTestTime, typingParams, updateTestEnd]);

  useEffect(() => {
    if (typingParams.mode !== "time") return;

    const interval = setInterval(checkTestEnd, 1000);
    return () => clearInterval(interval);
  }, [targetText, startTestTime, checkTestEnd, typingParams]);

  useEffect(() => {
    if (!targetText || typingParams.mode !== "time") return;
    const missingWords =
      typedWords.length + VISIBLE_WORDS_COUNT - targetWords.length;

    if (missingWords > 10) {
      generateTextByParams(typingParams, missingWords).then(
        (newWords: string) => {
          updateTargetText(`${targetText} ${newWords}`);
        }
      );
    }
  }, [typedWords, updateTargetText, targetText, targetWords, typingParams]);
};

const isTestEnd = (startTestTime: number, testDurationSec: number) => {
  return (
    Date.now() > startTestTime + testDurationSec * 1000 && startTestTime !== 0
  );
};
