import { useStore } from "@/store/store";
import { useState, useEffect, useRef, useCallback } from "react";

export const useStats = ({
  typedWords,
  needWords,
}: {
  typedWords: string[];
  needWords: string[];
}) => {
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const prevNeedWordsRef = useRef<string[]>(needWords);
  const wpmHistoryRef = useRef<number[]>([]);
  const rawWpmHistoryRef = useRef<number[]>([]);
  const typedText = useStore((state) => state.typedText);

  const setStartTestTime = useStore((state) => state.setStartTestTime);
  const setEndTestTime = useStore((state) => state.setEndTestTime);
  const startTestTime = useStore((state) => state.startTestTime);
  const endTestTime = useStore((state) => state.endTestTime);
  const isTestEnd = useStore((state) => state.isTestEnd);

  const typedWordsRef = useRef<string[]>(typedWords);
  const needWordsRef = useRef<string[]>(needWords);

  useEffect(() => {
    typedWordsRef.current = typedWords;
  }, [typedWords]);

  useEffect(() => {
    needWordsRef.current = needWords;
  }, [needWords]);

  useEffect(() => {
    setWpm(0);
    setAccuracy(0);
    wpmHistoryRef.current = [];
    rawWpmHistoryRef.current = [];
    prevNeedWordsRef.current = needWords;
    setStartTestTime(0);
    setEndTestTime(0);
  }, [isTestEnd, setEndTestTime, setStartTestTime, needWords]);

  const updateStats = useCallback(() => {
    // Проверяем, начался ли тест (есть хотя бы один введенный символ)
    const hasStarted = useStore.getState().typedText.length > 0;
    if (!hasStarted) return;

    // Устанавливаем время старта теста, если оно еще не задано
    if (startTestTime === 0) {
      const now = Date.now();
      setStartTestTime(now);
    }

    const elapsedMinutes = (Date.now() - startTestTime) / 1000 / 60;
    let totalChars = 0;
    let correctChars = 0;
    let validTypedChars = 0;

    typedWordsRef.current.forEach((typedWord, index) => {
      const referenceWord = needWordsRef.current[index] || "";
      let wordCorrectChars = 0;

      for (let i = 0; i < typedWord.length; i++) {
        if (typedWord[i] === referenceWord[i]) {
          wordCorrectChars++;
        } else {
          break;
        }
      }

      totalChars += typedWord.length + 1;
      correctChars += wordCorrectChars + 1;
      validTypedChars += wordCorrectChars + 1;
    });

    if (elapsedMinutes > 0) {
      const computedWpm = validTypedChars / 5 / elapsedMinutes;
      setWpm(Math.round(computedWpm));
      wpmHistoryRef.current.push(Math.round(computedWpm));
      rawWpmHistoryRef.current.push(validTypedChars / 5 / elapsedMinutes); // Без округления
    }

    if (totalChars > 0) {
      const computedAccuracy = (correctChars / totalChars) * 100;
      setAccuracy(Math.round(computedAccuracy));
    }
  }, [setStartTestTime, startTestTime]);

  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(updateStats, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isTestEnd, updateStats]);

  // Фиксируем окончание теста
  useEffect(() => {
    if (isTestEnd && endTestTime === 0) {
      setEndTestTime(Date.now());
    }
  }, [isTestEnd, setEndTestTime, endTestTime]);

  useEffect(() => {
    if (typedText.length === 0 || startTestTime !== 0) return;

    updateStats();
  }, [typedText, startTestTime, updateStats]);

  return {
    wpm,
    accuracy,
    wpmHistory: wpmHistoryRef.current,
    rawWpmHistory: rawWpmHistoryRef.current,
  };
};
