import { useStore } from "@/store/store";
import { useEffect } from "react";

export const useTestEnd = ({
  typedWords,
  needWords,
}: {
  typedWords: string[];
  needWords: string[];
}) => {
  const updateTestEnd = useStore((state) => state.updateTestEnd);
  const { mode } = useStore((state) => state.typingParams);
  useEffect(() => {
    if (
      mode !== "time" &&
      typedWords[0] !== "" &&
      typedWords.length >= needWords.length &&
      typedWords[typedWords.length - 1].length ===
        needWords[needWords.length - 1].length
    ) {
      updateTestEnd(true);
    }
  }, [typedWords, needWords, updateTestEnd, mode]);
};
