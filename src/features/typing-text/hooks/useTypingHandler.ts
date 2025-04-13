import { useRef } from "react";
import { useTestEnd } from "./subhooks/useTestEnd";
import { useManagedTypedWords } from "./subhooks/useManagedTypedWords";
import { useGlobalIndex } from "./subhooks/useGlobalIndex";
import { useTextResetAnimation } from "./subhooks/useTextResetAnimation";
import { useWordsWithIndices } from "./subhooks/useWordsWithIndices";
import { useStats } from "./subhooks/useStats";
import { useTimeTest } from "./subhooks/useTimeTest";
import { useUISizing } from "./subhooks/useUISizing";
import { useDynamicWords } from "./subhooks/useDynamicWords";
import { useTestStarted } from "./subhooks/useTestStarted";
import { useCompletedWordsLength } from "./subhooks/useCompletedWordsLength";
import { useManagedTargetWords } from "./subhooks/useManagedTargetWords";
import { useCaretWithPartialText } from "./subhooks/useCaretWithPartialText";

export const useTypingHandler = () => {
  // -------------------
  // Хуки для состояния текста
  // -------------------
  useManagedTargetWords();
  useManagedTypedWords();

  // -------------------
  // Рефы для управления интерфейсом
  // -------------------
  const containerRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // -------------------
  // Логика теста
  // -------------------

  useDynamicWords();

  useUISizing({ containerRef, caretRef });

  useCompletedWordsLength();

  useTextResetAnimation();

  // -------------------
  // Анимации и управление тестом
  // -------------------

  useCaretWithPartialText({ containerRef, caretRef });
  useTestEnd();

  useGlobalIndex();

  useWordsWithIndices();

  useStats();

  useTimeTest();

  useTestStarted();

  return {
    containerRef,
    caretRef,
    inputRef,
  };
};
