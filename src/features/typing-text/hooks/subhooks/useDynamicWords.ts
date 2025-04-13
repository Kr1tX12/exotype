import { useEffect } from "react";
import { VISIBLE_WORDS_COUNT } from "../../typing-text.constants";
import { generateTextByParams } from "../../utils/generateTextByParams";
import { useStore } from "@/store/store";

export const useDynamicWords = () => {
  const targetWords = useStore((state) => state.targetWords);
  const typedWords = useStore((state) => state.typedWords);

  const typingParams = useStore((state) => state.typingParams);
  const targetText = useStore((state) => state.targetText);
  const updateTargetText = useStore((state) => state.updateTargetText);

  useEffect(() => {
    const generateMissingText = async () => {
      if (typedWords.length <= 1 || typingParams.mode === "ai") return;

      const maxWordsToAppend = typingParams.words - targetWords.length;

      if (maxWordsToAppend <= 0) return;

      const missingWords =
        typedWords.length + VISIBLE_WORDS_COUNT * 2 - targetWords.length;

      if (missingWords > VISIBLE_WORDS_COUNT) {
        const textToAppend = await generateTextByParams(typingParams);

        updateTargetText(`${targetText} ${textToAppend}`);
      }
    };

    generateMissingText();
  }, [
    typedWords.length,
    targetWords.length,
    typingParams,
    targetText,
    updateTargetText,
  ]);
};
