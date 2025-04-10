import { useStore } from "@/store/store";
import { useState, useEffect, useRef, useCallback } from "react";

// Оптимизированный useStats:
// * Собираем статистику через один проход по массиву typedWords
// * Обновления (setInterval) выполняются каждые 1 сек, только если тест запущен
// * Используем useRef для хранения текущего состояния, чтобы не создавать лишних зависимостей
export const useStats = ({
  typedWords,
  targetWords,
}: {
  typedWords: string[];
  targetWords: string[];
}) => {
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  // Истории для графика WPM и rawWPM
  const wpmHistoryRef = useRef<number[]>([]);
  const rawWpmHistoryRef = useRef<number[]>([]);

  // Храним массивы слов и таймстемпов по буквам в useRef, чтобы не пересчитывать их каждый раз
  const typedWordsRef = useRef<string[]>(typedWords);
  const targetWordsRef = useRef<string[]>(targetWords);
  const letterTimestampsRef = useRef<number[][]>([]);
  const prevTypedWordsRef = useRef<string[]>([]);

  // Из глобального стора получаем параметры теста
  const typedText = useStore((state) => state.typedText);
  const setStartTestTime = useStore((state) => state.setStartTestTime);
  const setEndTestTime = useStore((state) => state.setEndTestTime);
  const startTestTime = useStore((state) => state.startTestTime);
  const endTestTime = useStore((state) => state.endTestTime);
  const isTestEnd = useStore((state) => state.isTestEnd);
  const setStats = useStore((state) => state.setStats);
  const isTestReloading = useStore((state) => state.isTestReloading);

  // Обновляем ref с текущими данными, чтобы не зависеть от массива в зависимостях useEffect
  useEffect(() => {
    typedWordsRef.current = typedWords;
  }, [typedWords]);
  useEffect(() => {
    targetWordsRef.current = targetWords;
  }, [targetWords]);

  // Обновляем таймстемпы для каждой буквы, используя один проход,
  // только для последнего слова, чтобы не создавать лишнюю нагрузку.
  useEffect(() => {
    const currentLen = typedWords.length;
    const prevLen = prevTypedWordsRef.current.length;

    // Если новых слов добавилось – инициализировать для них массив таймстемпов
    if (currentLen > prevLen) {
      for (let i = prevLen; i < currentLen; i++) {
        letterTimestampsRef.current.push([]);
        if (typedWords[i].length > 0) {
          letterTimestampsRef.current[i].push(Date.now());
        }
      }
    } else if (currentLen === prevLen && currentLen > 0) {
      const lastIndex = currentLen - 1;
      const prevWord = prevTypedWordsRef.current[lastIndex] || "";
      const currentWord = typedWords[lastIndex];
      if (currentWord.length > prevWord.length) {
        // Добавляем таймстемпы для новых букв
        const newLettersCount = currentWord.length - prevWord.length;
        for (let i = 0; i < newLettersCount; i++) {
          letterTimestampsRef.current[lastIndex].push(Date.now());
        }
      } else if (currentWord.length < prevWord.length) {
        // Удаляем таймстемпы для стертых букв
        const removedCount = prevWord.length - currentWord.length;
        letterTimestampsRef.current[lastIndex].splice(currentWord.length, removedCount);
      }
    }
    prevTypedWordsRef.current = typedWords;
  }, [typedWords]);

  // Функция для обновления статистики. Выполняется не чаще, чем раз в секунду.
  const updateStats = useCallback(() => {
    // Если тест ещё не начался, ничего не делаем
    if (!useStore.getState().typedText.length) return;

    // Если тест стартовал впервые, зафиксируем время старта
    if (startTestTime === 0) {
      setStartTestTime(Date.now());
    }

    const elapsedMinutes = (Date.now() - startTestTime) / 60000; // 60000 = 60,000 мс
    if (elapsedMinutes <= 0) return;

    let totalChars = 0;
    let correctChars = 0;
    let validTypedChars = 0;

    // Один проход по массиву слов для подсчёта символов
    for (let index = 0; index < typedWordsRef.current.length; index++) {
      const word = typedWordsRef.current[index];
      const target = targetWordsRef.current[index] || "";
      let wordCorrectChars = 0;
      const len = word.length;
      for (let i = 0; i < len; i++) {
        if (word[i] === target[i]) {
          wordCorrectChars++;
        } else {
          break;
        }
      }
      // Если слово полностью совпадает, добавим бонус
      const charAdder = wordCorrectChars === target.length ? 1 : 0;
      totalChars += word.length + charAdder;
      correctChars += wordCorrectChars + charAdder;
      validTypedChars += wordCorrectChars + charAdder;
    }

    if (elapsedMinutes > 0) {
      const computedWpm = validTypedChars / 5 / elapsedMinutes;
      const rawWpm = totalChars / 5 / elapsedMinutes;
      setWpm(Math.round(computedWpm));
      wpmHistoryRef.current.push(computedWpm);
      rawWpmHistoryRef.current.push(rawWpm);
    }
    if (totalChars > 0) {
      const computedAccuracy = (correctChars / totalChars) * 100;
      setAccuracy(Math.round(computedAccuracy));
    }
  }, [setStartTestTime, startTestTime]);

  // Запускаем обновление статистики раз в секунду
  useEffect(() => {
    const intervalId = setInterval(updateStats, 1000);
    return () => clearInterval(intervalId);
  }, [isTestEnd, updateStats]);

  // При окончании теста сохраняем историю статистики и фиксируем время финиша
  useEffect(() => {
    if (isTestEnd && endTestTime === 0) {
      setStats({
        wpmHistory: wpmHistoryRef.current,
        rawWpmHistory: rawWpmHistoryRef.current,
        letterTimestamps: letterTimestampsRef.current,
      });
      setEndTestTime(Date.now());
    }
  }, [isTestEnd, endTestTime, setEndTestTime, setStats]);

  // Если тест только начинает идти и typedText изменился – разово обновляем статистику
  useEffect(() => {
    if (typedText.length === 0 || startTestTime !== 0) return;
    updateStats();
  }, [typedText, startTestTime, updateStats]);

  // При перезагрузке теста очищаем накопленные данные
  useEffect(() => {
    wpmHistoryRef.current = [];
    rawWpmHistoryRef.current = [];
    letterTimestampsRef.current = [];
    prevTypedWordsRef.current = [];
    setStats({
      wpmHistory: [],
      rawWpmHistory: [],
      letterTimestamps: [],
    });
  }, [isTestReloading, setStats]);

  return {
    wpm,
    accuracy,
    wpmHistory: wpmHistoryRef.current,
    rawWpmHistory: rawWpmHistoryRef.current,
    letterTimestamps: letterTimestampsRef.current,
  };
};

