import { useStore } from "@/store/store";
import { useState, useEffect, useRef } from "react";

export const useTextResetAnimation = ({
  needWords,
}: {
  needWords: string[];
}) => {
  const isTestReloading = useStore((state) => state.isTestReloading);
  const [displayedWords, setDisplayedWords] = useState(needWords);
  const [isContentReady, setIsContentReady] = useState(false);

  const isTimerEnd = useRef(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const transitionDuration = 0.15;

  useEffect(() => {
    if (needWords.length > 0) {
      setIsContentReady(true);
    }
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (isTestReloading) {
      setIsContentReady(false);
      isTimerEnd.current = false;
      const startTime = Date.now();

      timerRef.current = setTimeout(() => {
        isTimerEnd.current = true;
        if (useStore.getState().isTestReloading) return;

        const elapsedTime = (Date.now() - startTime) / 1000;
        const remainingTime = Math.max(0, transitionDuration - elapsedTime);

        setTimeout(() => {
          setDisplayedWords(needWords);
          setIsContentReady(true);
        }, remainingTime * 1000);
      }, transitionDuration * 1000);
    } else {
      setTimeout(() => {
        setDisplayedWords(needWords);
        setIsContentReady(true);
      }, transitionDuration * 1000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isTestReloading, needWords]);

  const animationOpacity = isContentReady ? 1 : 0;

  return { animationOpacity, transitionDuration, displayedWords };
};
