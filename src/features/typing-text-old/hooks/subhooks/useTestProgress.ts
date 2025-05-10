import { useStore } from "@/store/store";
import { useEffect, useState, useMemo } from "react";

export const useTestProgress = () => {
  const typedWords = useStore((state) => state.typedWords);
  const targetWords = useStore((state) => state.typedWords);

  const [progress, setProgress] = useState(0);
  const startTestTime = useStore((state) => state.startTestTime);
  const { mode, time, words } = useStore((state) => state.typingParams);

  useEffect(() => {
    if (mode !== "words" && mode !== "ai") return;

    const completedWords = typedWords.length - 1;
    const currentWordLength = typedWords[typedWords.length - 1]?.length || 0;
    const targetWordLength = targetWords[typedWords.length - 1]?.length || 1;

    const currentWordProgress = Math.min(
      currentWordLength / targetWordLength,
      1
    );

    const totalTarget = mode === "words" ? words : targetWords.length;
    const progressFraction =
      (completedWords + currentWordProgress) / totalTarget;

    setProgress(progressFraction * 100);
  }, [typedWords, targetWords, words, mode]);

  useEffect(() => {
    if (mode !== "time" || startTestTime === 0) {
      if (mode === "time") setProgress(0);
      return;
    }

    const updateProgress = () => {
      const passedTime = Date.now() - startTestTime;
      const testDuration = time * 1000;
      setProgress(Math.min((passedTime / testDuration) * 100, 100));
    };

    updateProgress();

    const interval = setInterval(updateProgress, 50);
    return () => clearInterval(interval);
  }, [startTestTime, time, mode]);

  const transition = useMemo(
    () =>
      mode === "time"
        ? { duration: 0.05, ease: "linear" as const }
        : {
            duration: 0.3,
            type: "spring" as const,
            damping: 100,
            stiffness: 400,
          },
    [mode]
  );

  return { progress, transition };
};
