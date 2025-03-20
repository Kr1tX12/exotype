import { useStore } from "@/store/store";
import { useCallback, useEffect } from "react";
import { useReloadTest } from "./useReloadTest";

export const useTestEnd = ({
  typedWords,
  needWords,
}: {
  typedWords: string[];
  needWords: string[];
}) => {
  const updateTestEnd = useStore((state) => state.updateTestEnd);
  const { mode } = useStore((state) => state.typingParams);
  const reloadTest = useReloadTest();
  const typingParams = useStore((state) => state.typingParams);

  const checkTestEnd = useCallback(() => {
    return (
      mode !== "time" &&
      typedWords[0] !== "" &&
      ((typedWords.length >= needWords.length &&
        typedWords[needWords.length - 1].length >=
          needWords[needWords.length - 1].length) ||
        typedWords.length > needWords.length)
    );
  }, [mode, needWords, typedWords]);

  useEffect(() => {
    if (checkTestEnd()) {
      updateTestEnd(true);
    }
  }, [checkTestEnd, updateTestEnd]);

  useEffect(() => {
    reloadTest();
  }, [typingParams, reloadTest]);
};
