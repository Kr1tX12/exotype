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
  const wpmHistoryRef = useRef<number[]>([]);
  const rawWpmHistoryRef = useRef<number[]>([]);
  const typedText = useStore((state) => state.typedText);

  const setStartTestTime = useStore((state) => state.setStartTestTime);
  const setEndTestTime = useStore((state) => state.setEndTestTime);
  const startTestTime = useStore((state) => state.startTestTime);
  const endTestTime = useStore((state) => state.endTestTime);
  const isTestEnd = useStore((state) => state.isTestEnd);
  const setStats = useStore((state) => state.setStats);

  const typedWordsRef = useRef<string[]>(typedWords);
  const needWordsRef = useRef<string[]>(needWords);

  // Новый ref для хранения меток времени для каждого символа, структурой: number[][],
  // где каждый внутренний массив соответствует отдельному слову.
  const letterTimestampsRef = useRef<number[][]>([]);
  // Ref для хранения предыдущего состояния typedWords, чтобы отслеживать изменения
  const prevTypedWordsRef = useRef<string[]>([]);

  useEffect(() => {
    typedWordsRef.current = typedWords;
  }, [typedWords]);

  useEffect(() => {
    needWordsRef.current = needWords;
  }, [needWords]);

  useEffect(() => {
    if (typedWords.length > prevTypedWordsRef.current.length) {
      for (let i = prevTypedWordsRef.current.length; i < typedWords.length; i++) {
        letterTimestampsRef.current.push([]);
        if (typedWords[i].length > 0) {
          letterTimestampsRef.current[i].push(Date.now());
        }
      }
    } else if (typedWords.length === prevTypedWordsRef.current.length && typedWords.length > 0) {
      const lastIndex = typedWords.length - 1;
      const prevWord = prevTypedWordsRef.current[lastIndex] || "";
      const currentWord = typedWords[lastIndex];
      
      if (currentWord.length > prevWord.length) {
        const newLettersCount = currentWord.length - prevWord.length;
        for (let i = 0; i < newLettersCount; i++) {
          letterTimestampsRef.current[lastIndex].push(Date.now());
        }
      }
      
      // Если длина текущего слова уменьшилась (буквы были удалены), удаляем метки времени для удалённых символов
      if (currentWord.length < prevWord.length) {
        const removedLettersCount = prevWord.length - currentWord.length;
        letterTimestampsRef.current[lastIndex].splice(
          currentWord.length, 
          removedLettersCount
        );
      }
    }
    
    // Обновляем предыдущие введённые слова
    prevTypedWordsRef.current = typedWords;
  }, [typedWords]);
  

  const updateStats = useCallback(() => {
    // Проверяем, начался ли тест (есть хотя бы один введенный символ)
    const hasStarted = useStore.getState().typedText.length > 0;
    if (!hasStarted) return;

    // Устанавливаем время старта теста, если оно ещё не задано
    if (startTestTime === 0) {
      setStartTestTime(Date.now());
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
      rawWpmHistoryRef.current.push(validTypedChars / 5 / elapsedMinutes);
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

  // Фиксируем окончание теста: записываем статистику, включая метки времени символов, в стор
  useEffect(() => {
    if (isTestEnd && endTestTime === 0) {
      setStats({
        wpmHistory: wpmHistoryRef.current,
        rawWpmHistory: rawWpmHistoryRef.current,
        letterTimestamps: letterTimestampsRef.current, // сохраняем временные метки каждого символа
      });
      setEndTestTime(Date.now());
    }
  }, [isTestEnd, endTestTime, setEndTestTime, setStats]);

  useEffect(() => {
    if (typedText.length === 0 || startTestTime !== 0) return;
    updateStats();
  }, [typedText, startTestTime, updateStats]);

  return {
    wpm,
    accuracy,
    wpmHistory: wpmHistoryRef.current,
    rawWpmHistory: rawWpmHistoryRef.current,
    letterTimestamps: letterTimestampsRef.current,
  };
};
