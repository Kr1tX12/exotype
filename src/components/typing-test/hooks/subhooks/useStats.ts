import { useStore } from "@/store/store";
import { useState, useEffect, useRef, useCallback } from "react";

export const useStats = ({
  typedWords,
  targetWords,
}: {
  typedWords: string[];
  targetWords: string[];
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
  const isTestReloading = useStore((state) => state.isTestReloading);

  const typedWordsRef = useRef<string[]>(typedWords);
  const needWordsRef = useRef<string[]>(targetWords);

  const letterTimestampsRef = useRef<number[][]>([]);
  const prevTypedWordsRef = useRef<string[]>([]);

  useEffect(() => {
    typedWordsRef.current = typedWords;
  }, [typedWords]);

  useEffect(() => {
    needWordsRef.current = targetWords;
  }, [targetWords]);

  useEffect(() => {
    if (typedWords.length > prevTypedWordsRef.current.length) {
      for (
        let i = prevTypedWordsRef.current.length;
        i < typedWords.length;
        i++
      ) {
        letterTimestampsRef.current.push([]);
        if (typedWords[i].length > 0) {
          letterTimestampsRef.current[i].push(Date.now());
        }
      }
    } else if (
      typedWords.length === prevTypedWordsRef.current.length &&
      typedWords.length > 0
    ) {
      const lastIndex = typedWords.length - 1;
      const prevWord = prevTypedWordsRef.current[lastIndex] || "";
      const currentWord = typedWords[lastIndex];

      if (currentWord.length > prevWord.length) {
        const newLettersCount = currentWord.length - prevWord.length;
        for (let i = 0; i < newLettersCount; i++) {
          letterTimestampsRef.current[lastIndex].push(Date.now());
        }
      }

      if (currentWord.length < prevWord.length) {
        const removedLettersCount = prevWord.length - currentWord.length;
        letterTimestampsRef.current[lastIndex].splice(
          currentWord.length,
          removedLettersCount
        );
      }
    }

    prevTypedWordsRef.current = typedWords;
  }, [typedWords]);

  const updateStats = useCallback(() => {
    const hasStarted = useStore.getState().typedText.length > 0;
    if (!hasStarted) return;

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
      const correct = wordCorrectChars === referenceWord.length;
      const charAdder = correct ? 1 : 0;
      
      totalChars += typedWord.length + charAdder;
      correctChars += wordCorrectChars + charAdder;
      validTypedChars += wordCorrectChars + charAdder;
    });

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

  useEffect(() => {
    if (typedText.length === 0 || startTestTime !== 0) return;
    updateStats();
  }, [typedText, startTestTime, updateStats]);

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
