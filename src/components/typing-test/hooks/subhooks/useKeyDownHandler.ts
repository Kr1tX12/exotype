"use client";

import { useStore } from "@/store/store";
import { useCallback, useEffect } from "react";

export const useKeyDownHandler = ({
  typedWords,
  startWordsIndex,
}: {
  typedWords: string[];
  startWordsIndex: number;
}) => {
  // -------------------
  // ЧТОБЫ ПИСАТЬ МОЖНО БЫЛО НОРМАЛЬНО!!!!!!!
  // -------------------

  const typedText = useStore((state) => state.typedText);
  const needText = useStore((state) => state.needText);
  const updateTypedText = useStore((state) => state.updateTypedText);

  const handleKeyDown = useCallback(
    ({
      typed,
      isMeta,
      ctrlKey,
      isBackspace,
      isEnter,
      preventDefault,
    }: {
      typed: string;
      isMeta: boolean;
      ctrlKey: boolean;
      isBackspace: boolean;
      isEnter: boolean;
      preventDefault: (() => void) | null;
    }) => {
      // НЕ НАЖИМАЙТЕ НА ЭТИ КНОПКИ!!!!!!!!!!
      if (isMeta) {
        return;
      }

      if (ctrlKey && isBackspace) {
        preventDefault?.();
        updateTypedText((prev: string) => {
          const words = prev.split(" ");
          words.pop(); // Удаляем последнее слово
          return words.join(" ").trimEnd(); // Удаляем пробел в конце
        });
      } else if (isBackspace) {
        // УДАЛЯЕМ один символ..........................
        if (typedWords.length <= startWordsIndex + 1 && typedText.endsWith(" "))
          return;

        updateTypedText((prev) => prev.slice(0, prev.length - 1));
      } else if (isEnter) {
        // ЭТО НЕ НУЖНО!!!!!!!
      } else if (typed === " ") {
        updateTypedText((prev) => {
          // Нельзя ставить два пробела подряд!
          if (
            (prev.length > 0 && prev[prev.length - 1] === " ") ||
            prev.length === 0
          ) {
            return prev;
          }
          // Нормально, можно
          if (needText[prev.length] === " ") {
            return prev + " ";
          }

          return prev + " ";
        });
      } else if (typed.length === 1) {
        // ПРосто БУКВААААААААААААААААААААААА!!!!!!!!!!!!!!
        updateTypedText((prev) => prev + typed);
      }
    },
    [needText, startWordsIndex, typedText, typedWords.length, updateTypedText]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      handleKeyDown({
        typed: e.key,
        isMeta: ["Control", "Meta", "Shift", "Alt"].includes(e.key),
        ctrlKey: e.ctrlKey,
        isBackspace: e.key === "Backspace",
        isEnter: e.key === "Enter",
        preventDefault: () => e.preventDefault(),
      });
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [
    needText,
    typedText,
    updateTypedText,
    startWordsIndex,
    typedWords.length,
    handleKeyDown,
  ]);

  return { handleKeyDown };
};
