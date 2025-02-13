"use client";
import { useMemo, useRef } from "react";
import { useStore } from "@/store/store";
import { useKeyDownHandler } from "./useKeyDownHandler";
import { useCaretAnimation } from "./useCaretAnimation";
import { useTypingTestAutoScroll } from "./useTypingTestAutoScroll";
import { useTestEnd } from "./useTestEnd";

export const useTypingHandler = () => {
  // -------------------
  // ТЕКСТ
  // -------------------
  const typedText = useStore((state) => state.typedText);
  const needText = useStore((state) => state.needText);
  const isTestReloading = useStore((state) => state.isTestReloading);

  const needWords = useMemo(() => needText.split(" "), [needText]);
  const typedWords = useMemo(() => typedText.split(" "), [typedText]);
  const prevWordsLength = needWords
    .slice(0, typedWords.length - 1)
    .reduce((acc, word, i) => {
      console.log(word);
      return (
        acc +
        (word.length > typedWords[i].length
          ? word.length
          : typedWords[i].length) +
        1
      );
    }, 0);

  // -------------------
  // РЕФЫ
  // -------------------
  const containerRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);

  // -------------------
  // ДРУГАЯ ЛОГИКА
  // -------------------

  useKeyDownHandler();

  useCaretAnimation({
    containerRef,
    caretRef,
    prevWordsLength,
    typedWords,
  });
  useTypingTestAutoScroll({
    containerRef,
    typedWords,
    prevWordsLength,
  });
  useTestEnd({ typedWords, needWords });

  const progressValue = (typedText.length / needText.length) * 100;

  const returnData = {
    typedText,
    needText,
    typedWords,
    needWords,
    progressValue,
    containerRef,
    caretRef,
    isTestReloading,
  };
  return returnData;
};
