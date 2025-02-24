"use client";
import { useEffect, useMemo, useRef } from "react";
import { useStore } from "@/store/store";
import { useKeyDownHandler } from "./useKeyDownHandler";
import { useCaretAnimation } from "./useCaretAnimation";
import { useTypingTestAutoScroll } from "./useTypingTestAutoScroll";
import { useTestEnd } from "./useTestEnd";
import { useTextResetAnimation } from "./useTextResetAnimation";
import { usePrevLettersLength } from "./usePrevLettersLength";
import { useManagedTypedWords } from "./useManagedTypedWords";
import { usePartialText } from "./usePartialText";

export const useTypingHandler = () => {
  // -------------------
  // ТЕКСТ
  // -------------------
  const typedText = useStore((state) => state.typedText);
  const needText = useStore((state) => state.needText);
  const isTestReloading = useStore((state) => state.isTestReloading);

  // Разбиваем текст на слова
  const needWords = useMemo(() => needText.split(" "), [needText]);
  const typedWords = useManagedTypedWords(typedText);

  // -------------------
  // РЕФЫ
  // -------------------
  const containerRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);

  // -------------------
  // ДРУГАЯ ЛОГИКА
  // -------------------

  const prevLettersLength = usePrevLettersLength({
    needWords,
    typedText,
    typedWords,
  });

  const { endWordsIndex, startWordsIndex, update } = usePartialText({
    typedWords,
    needWords,
    prevLettersLength,
    container: containerRef.current,
  });

  useTypingTestAutoScroll({
    containerRef,
    typedWords,
    prevLettersLength,
    onScroll: update,
  });

  useKeyDownHandler();

  useTestEnd({ typedWords, needWords });

  const { animationOpacity, transitionDuration, displayedWords } =
    useTextResetAnimation({ needWords });

  const progressValue = (typedText.length / needText.length) * 100;

  useCaretAnimation({
    containerRef,
    caretRef,
    prevLettersLength,
    typedWords,
  });

  return {
    typedText,
    needText,
    typedWords,
    needWords,
    progressValue,
    containerRef,
    caretRef,
    isTestReloading,
    animationOpacity,
    transitionDuration,
    displayedWords,
    startWordsIndex,
    endWordsIndex,
  };
};
