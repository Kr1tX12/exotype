import { useStore } from "@/store/store";
import { useCallback, useEffect } from "react";
import { useReloadTest } from "./useReloadTest";
import { useTypingState } from "../../components/typing-provider";

export const useTestEnd = () => {
  const typedWords = useTypingState((state) => state.typedWords);
  const targetWords = useTypingState((state) => state.targetWords);

  const updateTestEnd = useStore((state) => state.updateTestEnd);
  const { mode } = useStore((state) => state.typingParams);
  const reloadTest = useReloadTest();
  const typingParams = useStore((state) => state.typingParams);

  const checkTestEnd = useCallback(() => {
    if (!typedWords || !targetWords || targetWords.length === 0 || typedWords.length === 0) return false;


    return (
      mode !== "time" &&
      typedWords[0] !== "" &&
      ((typedWords.length >= targetWords.length &&
        typedWords[targetWords.length - 1].length >=
          targetWords[targetWords.length - 1].length) ||
        typedWords.length > targetWords.length)
    );
  }, [mode, targetWords, typedWords]);

  useEffect(() => {
    if (checkTestEnd()) {
      updateTestEnd(true);
    }
  }, [checkTestEnd, updateTestEnd]);

  useEffect(() => {
    reloadTest();
  }, [typingParams, reloadTest]);
};
