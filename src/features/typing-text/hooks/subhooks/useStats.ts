import { useStore } from "@/store/store";
import { useEffect, useRef, useCallback } from "react";
import {
  setAccuracy,
  setWpm,
  useTypingDispatch,
  useTypingState,
} from "../../components/typing-provider";

export const useStats = () => {
  const dispatch = useTypingDispatch();

  const typedWords = useTypingState((state) => state.typedWords);
  const targetWords = useTypingState((state) => state.targetWords);

  // Истории для графика WPM и rawWPM
  const wpmHistoryRef = useRef<number[]>([]);
  const rawWpmHistoryRef = useRef<number[]>([]);

  // Рефы для текущих значений, чтобы не добавлять их в зависимости useEffect
  const typedWordsRef = useRef<string[]>(typedWords);
  const targetWordsRef = useRef<string[]>(targetWords);
  const letterTimestampsRef = useRef<number[][]>([]);
  const prevTypedWordsRef = useRef<string[]>([]);

  // Глобальные параметры теста из стора
  const typedText = useStore((state) => state.typedText);
  const setStartTestTime = useStore((state) => state.setStartTestTime);
  const setEndTestTime = useStore((state) => state.setEndTestTime);
  const startTestTime = useStore((state) => state.startTestTime);
  const endTestTime = useStore((state) => state.endTestTime);
  const isTestEnd = useStore((state) => state.isTestEnd);
  const setStats = useStore((state) => state.setStats);
  const isTestReloading = useStore((state) => state.isTestReloading);

  // Обновляем ref-ы при изменении массивов
  useEffect(() => {
    typedWordsRef.current = typedWords;
  }, [typedWords]);
  useEffect(() => {
    targetWordsRef.current = targetWords;
  }, [targetWords]);

  // Асинхронное обновление таймстемпов для букв (обрабатываем только последнее слово)
  useEffect(() => {
    const currentLen = typedWords.length;
    const prevLen = prevTypedWordsRef.current.length;

    if (currentLen > prevLen) {
      // Добавляем новые слова
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
        const newLettersCount = currentWord.length - prevWord.length;
        for (let i = 0; i < newLettersCount; i++) {
          letterTimestampsRef.current[lastIndex].push(Date.now());
        }
      } else if (currentWord.length < prevWord.length) {
        const removedCount = prevWord.length - currentWord.length;
        letterTimestampsRef.current[lastIndex].splice(
          currentWord.length,
          removedCount
        );
      }
    }
    prevTypedWordsRef.current = typedWords;
  }, [typedWords]);

  // Функция для расчёта статистики, перенесённая в отдельный блок
  const updateStats = useCallback(() => {
    if (!useStore.getState().typedText.length) return;
    if (startTestTime === 0) {
      setStartTestTime(Date.now());
    }
    const elapsedMinutes = (Date.now() - startTestTime) / 60000; // 60000 мс = 1 минута
    if (elapsedMinutes <= 0) return;

    let totalChars = 0;
    let correctChars = 0;
    let validTypedChars = 0;

    // Один проход по массиву слов
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
      // Если слово полностью совпадает, даём небольшой бонус
      const charAdder = wordCorrectChars === target.length ? 1 : 0;
      totalChars += word.length + charAdder;
      correctChars += wordCorrectChars + charAdder;
      validTypedChars += wordCorrectChars + charAdder;
    }

    if (elapsedMinutes > 0) {
      const computedWpm = validTypedChars / 5 / elapsedMinutes;
      const rawWpm = totalChars / 5 / elapsedMinutes;
      setWpm(dispatch, Math.round(computedWpm));
      wpmHistoryRef.current.push(computedWpm);
      rawWpmHistoryRef.current.push(rawWpm);
    }
    if (totalChars > 0) {
      const computedAccuracy = (correctChars / totalChars) * 100;
      setAccuracy(dispatch, Math.round(computedAccuracy));
    }
  }, [setStartTestTime, startTestTime, dispatch]);

  // Асинхронное выполнение расчёта статистики через requestIdleCallback или setTimeout
  const asyncUpdateStats = useCallback(() => {
    const scheduler =
      window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 0));
    scheduler(() => {
      updateStats();
    });
  }, [updateStats]);

  // Запускаем асинхронное обновление статистики раз в секунду
  useEffect(() => {
    const intervalId = setInterval(() => {
      asyncUpdateStats();
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isTestEnd, asyncUpdateStats]);

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

  // При первом старте теста, если typedText изменился — разово обновляем статистику
  useEffect(() => {
    if (typedText.length === 0 || startTestTime !== 0) return;
    asyncUpdateStats();
  }, [typedText, startTestTime, asyncUpdateStats]);

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
};
