import { useStore } from "@/store/store";
import { useCallback, useEffect } from "react";

export const useTimeTest = () => {
  const needText = useStore((state) => state.needText);
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
};

const isTestEnd = (startTestTime: number, testDurationSec: number) => {
  return (Date.now() > startTestTime + testDurationSec * 1000) && startTestTime !== 0;
};
