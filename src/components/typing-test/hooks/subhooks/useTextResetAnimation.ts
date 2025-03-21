import { useStore } from "@/store/store";
import { useState, useEffect, useRef } from "react";

export const useTextResetAnimation = ({
  targetWords,
}: {
  targetWords: string[];
}) => {
  const isTestReloading = useStore((state) => state.isTestReloading);
  const startTestTime = useStore((state) => state.startTestTime);
  const [displayedWords, setDisplayedWords] = useState(targetWords);
  const [isContentReady, setIsContentReady] = useState(true);
  const isTestEnd = useStore((state) => state.isTestEnd);
  const transitionDuration = 0.15;

  const startTimeRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTestReloading) {
      startTimeRef.current = Date.now();
      setIsContentReady(false);
    }
  }, [isTestReloading]);

  useEffect(() => {
    if (!isTestReloading) {
      const elapsed = startTimeRef.current
        ? (Date.now() - startTimeRef.current) / 1000
        : transitionDuration;
      const remainingTime = Math.max(0, transitionDuration - elapsed);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setDisplayedWords(targetWords);
        setIsContentReady(true);
        startTimeRef.current = null;
      }, remainingTime * 1000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTestReloading, isTestEnd]);

  useEffect(() => {
    if (startTestTime !== 0) setDisplayedWords(targetWords);
  }, [targetWords, startTestTime]);

  const animationOpacity = isContentReady ? 1 : 0;

  return { animationOpacity, transitionDuration, displayedWords };
};
