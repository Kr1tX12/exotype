"use client";
import { useMemo, useRef } from "react";
import { useStore } from "@/store/store";
import { useKeyDownHandler } from "./subhooks/useKeyDownHandler";
import { useCaretAnimation } from "./subhooks/useCaretAnimation";
import { useTypingTestAutoScroll } from "./subhooks/useTypingTestAutoScroll";
import { useTestEnd } from "./subhooks/useTestEnd";
import { usePrevLettersLength } from "./subhooks/usePrevLettersLength";
import { useManagedTypedWords } from "./subhooks/useManagedTypedWords";
import { useGlobalIndex } from "./subhooks/useGlobalIndex";
import { usePartialText } from "./subhooks/usePartialText";
import { useTextResetAnimation } from "./subhooks/useTextResetAnimation";
import { useWordsWithIndices } from "./subhooks/useWordsWithIndices";
import { useStats } from "./subhooks/useStats";
import { useTimeTest } from "./subhooks/useTimeTest";

export const useTypingHandler = () => {
  // -------------------
  // ТЕКСТ
  // -------------------
  const typedText = useStore((state) => state.typedText);
  const needText = useStore((state) => state.needText);
  const isTestReloading = useStore((state) => state.isTestReloading);
  const typingParams = useStore((state) => state.typingParams);
  const startTestTime = useStore((state) => state.startTestTime);

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

  useKeyDownHandler({ typedWords, startWordsIndex });

  useTestEnd({ typedWords, needWords });

  const { animationOpacity, transitionDuration, displayedWords } =
    useTextResetAnimation({ needWords });

  const passedTime = startTestTime === 0 ? 0 : Date.now() - startTestTime;
  const testDuration = typingParams.time * 1000;
  const progressValue =
    typingParams.mode === "time"
      ? (passedTime / testDuration) * 100
      : ((typedWords.length - 1) / needWords.length) * 100;

  useCaretAnimation({
    containerRef,
    caretRef,
    prevLettersLength,
    typedWords,
  });

  const initialGlobalIndex = useGlobalIndex(
    needWords,
    typedWords,
    startWordsIndex
  );

  const wordsWithIndices = useWordsWithIndices({
    initialGlobalIndex,
    displayedWords,
    startWordsIndex,
    endWordsIndex,
    typedWords,
  });

  const { wpm, accuracy } = useStats({ typedWords, needWords });

  // Чтобы тест заканчивался когда время заканчивается + авторерендер каждую секунду
  useTimeTest({ startWordsIndex, needWords, typedWords });

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
    initialGlobalIndex,
    wordsWithIndices,
    wpm,
    accuracy,
  };
};
