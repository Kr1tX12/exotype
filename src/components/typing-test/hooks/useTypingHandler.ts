import { useMemo, useRef } from "react";
import { useStore } from "@/store/store";
import { useKeyDownHandler } from "./subhooks/useKeyDownHandler";
import { useCaretAnimation } from "./subhooks/useCaretAnimation";
import { useTestEnd } from "./subhooks/useTestEnd";
import { useManagedTypedWords } from "./subhooks/useManagedTypedWords";
import { useGlobalIndex } from "./subhooks/useGlobalIndex";
import { usePartialText } from "./subhooks/usePartialText";
import { useTextResetAnimation } from "./subhooks/useTextResetAnimation";
import { useWordsWithIndices } from "./subhooks/useWordsWithIndices";
import { useStats } from "./subhooks/useStats";
import { useTimeTest } from "./subhooks/useTimeTest";
import { useMobileTyping } from "./subhooks/useMobileTyping";
import { useAutoScroll } from "./subhooks/useAutoScroll";
import { useUISizing } from "./subhooks/useUISizing";
import { useDynamicWords } from "./subhooks/useDynamicWords";
import { useTestStarted } from "./subhooks/useTestStarted";
import { useCompletedWordsLength } from "./subhooks/useCompletedWordsLength";

export const useTypingHandler = () => {
  // -------------------
  // Хуки для состояния текста
  // -------------------
  const typedText = useStore((state) => state.typedText);
  const targetText = useStore((state) => state.targetText);
  const isTestReloading = useStore((state) => state.isTestReloading);

  const targetWords = useMemo(() => targetText.split(" "), [targetText]);
  const typedWords = useManagedTypedWords(typedText);

  // -------------------
  // Рефы для управления интерфейсом
  // -------------------
  const containerRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);

  // -------------------
  // Логика теста
  // -------------------

  useDynamicWords({ typedWords, targetWords });

  const { getLineHeight } = useUISizing({
    containerRef,
    caretRef,
  });

  const completedWordsLength = useCompletedWordsLength({
    targetWords,
    typedWords,
  });

  const { endWordsIndex, startWordsIndex, update } = usePartialText({
    container: containerRef.current,
    targetWords,
    typedWords,
  });

  const { handleKeyDown } = useKeyDownHandler({ typedWords, startWordsIndex });
  const { handleMobileInput } = useMobileTyping({ handleKeyDown });

  const { animationOpacity, transitionDuration, displayedWords } =
    useTextResetAnimation({
      targetWords,
    });

  // -------------------
  // Анимации и управление тестом
  // -------------------

  useAutoScroll({
    containerRef,
    typedWords,
    typedText,
    completedWordsLength,
    getLineHeight,
    onScroll: update,
  });

  useCaretAnimation({
    containerRef,
    caretRef,
    completedWordsLength,
    typedWords,
  });

  useTestEnd({ typedWords, needWords: targetWords });

  const initialGlobalIndex = useGlobalIndex(
    targetWords,
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

  const { wpm, accuracy } = useStats({ typedWords, targetWords });

  useTimeTest({ startWordsIndex, targetWords, typedWords });

  const isTestStarted = useTestStarted();

  return {
    typedText,
    targetText,
    typedWords,
    targetWords,
    containerRef,
    caretRef,
    animationOpacity,
    transitionDuration,
    displayedWords,
    startWordsIndex,
    endWordsIndex,
    initialGlobalIndex,
    wordsWithIndices,
    wpm,
    accuracy,
    handleMobileInput,
    isTestReloading,
    isTestStarted,
  };
};
