import { useStore } from "@/store/store";
import { useCallback, useEffect } from "react";
import { VISIBLE_WORDS_COUNT } from "../../typing-test.constants";
import { generateTextByParams } from "../../utils/generateTextByParams";

export const useTimeTest = ({
  startWordsIndex,
  targetWords,
  typedWords,
}: {
  startWordsIndex: number;
  targetWords: string[];
  typedWords: string[];
}) => {
  const needText = useStore((state) => state.targetText);
  const typedText = useStore((state) => state.typedText);
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
  }, [needText, startTestTime, checkTestEnd, typingParams]);

  useEffect(() => {
    if (!needText || typingParams.mode !== "time") return;
    const missingWords =
      typedWords.length + VISIBLE_WORDS_COUNT - targetWords.length;

    if (missingWords > 10) {
      generateTextByParams(typingParams, missingWords).then(
        (newWords: string) => {
          updateTargetText(`${needText} ${newWords}`);
        }
      );
    }
  }, [
    typedWords,
    startWordsIndex,
    updateTargetText,
    needText,
    targetWords,
    typingParams,
    typedText,
  ]);
};

const isTestEnd = (startTestTime: number, testDurationSec: number) => {
  return (
    Date.now() > startTestTime + testDurationSec * 1000 && startTestTime !== 0
  );
};
