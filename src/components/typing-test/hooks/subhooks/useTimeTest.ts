import { useStore } from "@/store/store";
import { useCallback, useEffect } from "react";
import { VISIBLE_WORDS_COUNT } from "../../typing-test.constants";
import { generateText } from "@/lib/utils/text-generator";
import { Languages } from "@/constants";

export const useTimeTest = ({
  startWordsIndex,
  needWords,
  typedWords,
}: {
  startWordsIndex: number;
  needWords: string[];
  typedWords: string[];
}) => {
  const needText = useStore((state) => state.needText);
  const typedText = useStore((state) => state.typedText);
  const updateNeedText = useStore((state) => state.updateNeedText);
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
      typedWords.length + VISIBLE_WORDS_COUNT - needWords.length;

    if (missingWords > 10) {
      generateText({
        wordsCount: missingWords,
        punctuation: typingParams.punctuation,
        numbers: typingParams.numbers,
        dictionarySize: 250,
        language: Languages.RU,
      }).then((newWords: string) => {
        updateNeedText(`${needText} ${newWords}`);
      });
    }
  }, [
    typedWords,
    startWordsIndex,
    updateNeedText,
    needText,
    needWords,
    typingParams,
    typedText,
  ]);
};

const isTestEnd = (startTestTime: number, testDurationSec: number) => {
  return (
    Date.now() > startTestTime + testDurationSec * 1000 && startTestTime !== 0
  );
};
