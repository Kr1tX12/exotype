import { useStore } from "@/store/store";
import { useEffect } from "react";
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

  useEffect(() => {
    if (
      mode !== "time" &&
      typedWords[0] !== "" &&
      ((typedWords.length >= needWords.length &&
      typedWords[needWords.length - 1].length >=
        needWords[needWords.length - 1].length) || typedWords.length > needWords.length)
    ) {
      updateTestEnd(true);
    }
  }, [typedWords, needWords, updateTestEnd, mode]);

  useEffect(() => {
    reloadTest();
  }, [typingParams, reloadTest]);
};
