"use client";

import { useStore } from "@/store/store";
import { RefObject, useCallback, useEffect } from "react";
import { useTypingState } from "../../components/typing-provider";

export type KeyDownHandlerProps = {
  typed: string;
  isMeta: boolean;
  ctrlKey: boolean;
  isBackspace: boolean;
  isEnter: boolean;
  preventDefault?: () => void;
};

export const useKeyDownHandler = ({
  inputRef,
}: {
  inputRef: RefObject<HTMLInputElement | null>;
}) => {
  const typedWords = useTypingState((state) => state.typedWords);
  const startWordsIndex = useTypingState((state) => state.startWordsIndex);

  const currentTypedText = useStore((state) => state.typedText);
  const updateTypedText = useStore((state) => state.updateTypedText);

  const handleCtrlBackspace = useCallback(
    (preventDefault?: () => void) => {
      preventDefault?.();
      if (
        typedWords.length <= startWordsIndex + 1 &&
        currentTypedText.endsWith(" ")
      ) {
        return;
      }
      updateTypedText((prev) => {
        const lastSpaceIndex = prev.trimEnd().lastIndexOf(" ");
        return lastSpaceIndex !== -1 ? prev.slice(0, lastSpaceIndex + 1) : "";
      });
    },
    [updateTypedText, currentTypedText, startWordsIndex, typedWords.length]
  );

  const handleBackspace = useCallback(() => {
    if (
      typedWords.length <= startWordsIndex + 1 &&
      currentTypedText.endsWith(" ")
    ) {
      return;
    }
    updateTypedText((prev) => prev.slice(0, -1));
  }, [typedWords.length, startWordsIndex, currentTypedText, updateTypedText]);

  const handleSpace = useCallback(() => {
    updateTypedText((prev) => {
      if (!prev || prev.endsWith(" ")) return prev;
      return prev + " ";
    });
  }, [updateTypedText]);

  const handleCharacter = useCallback(
    (char: string) => {
      updateTypedText((prev) => prev + char);
    },
    [updateTypedText]
  );

  const handleKeyDown = useCallback(
    ({
      typed,
      isMeta,
      ctrlKey,
      isBackspace,
      isEnter,
      preventDefault,
    }: KeyDownHandlerProps) => {
      if (isMeta) return;
      if (ctrlKey && isBackspace) return handleCtrlBackspace(preventDefault);
      if (ctrlKey) return;
      if (isBackspace) return handleBackspace();
      if (isEnter) return;
      if (typed === " ") return handleSpace();
      if (typed.length === 1) return handleCharacter(typed);
    },
    [handleCtrlBackspace, handleBackspace, handleSpace, handleCharacter]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target !== inputRef?.current) return;

      handleKeyDown({
        typed: e.key,
        isMeta: ["Control", "Meta", "Shift", "Alt"].includes(e.key),
        ctrlKey: e.ctrlKey,
        isBackspace: e.key === "Backspace",
        isEnter: e.key === "Enter",
        preventDefault: e.preventDefault.bind(e),
      });
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handleKeyDown, inputRef]);

  return { handleKeyDown };
};
