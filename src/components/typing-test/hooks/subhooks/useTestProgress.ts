import { useStore } from "@/store/store";
import { useEffect, useState } from "react";

export const useTestProgress = ({
  typedWords,
  targetWords,
}: {
  typedWords: string[];
  targetWords: string[];
}) => {
  const [progress, setProgress] = useState(0);

  const startTestTime = useStore((state) => state.startTestTime);
  const { mode, time, words } = useStore((state) => state.typingParams);

  useEffect(() => {
    switch (mode) {
      case "words":
        const completedWords = typedWords.length - 1;

        const currentWordProgress = Math.min(
          typedWords[typedWords.length - 1].length /
            targetWords[typedWords.length - 1].length,
          1
        );

        const progressFraction = (completedWords + currentWordProgress) / words;

        setProgress(progressFraction * 100);
        break;
      case "ai":
        const aiCompletedWords = typedWords.length - 1;

        const aiCurrentWordProgress = Math.min(
          typedWords[typedWords.length - 1].length /
            targetWords[typedWords.length - 1].length,
          1
        );

        const aiProgressFraction =
          (aiCompletedWords + aiCurrentWordProgress) / targetWords.length;

        setProgress(aiProgressFraction * 100);
    }
  }, [typedWords, words, mode, targetWords]);

  useEffect(() => {
    if (mode !== "time") return;
    if (startTestTime === 0) {
      setProgress(0);
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

  const transition =
    mode === "time"
      ? { duration: 0.05, ease: "linear" }
      : { duration: 0.3, type: "spring", damping: 100, stiffness: 400 };

  return { progress, transition };
};
