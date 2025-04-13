import { useStore } from "@/store/store";
import { useState, useEffect, useRef } from "react";
import { TRANSITION_DURATION } from "../../typing-text.constants";

export const useTextResetAnimation = () => {
  const targetWords = useStore((state) => state.targetWords);
  const isTestReloading = useStore((state) => state.isTestReloading);
  const startTestTime = useStore((state) => state.startTestTime);
  const [isContentReady, setIsContentReady] = useState(true);
  const isTestEnd = useStore((state) => state.isTestEnd);
  const isTestStarted = useStore((state) => state.isTestStarted);
  const updateDisplayedWords = useStore(
    (state) => state.updateDisplayedWords
  );
  const updateAnimationOpacity = useStore(
    (state) => state.updateAnimationOpacity
  );
  const startTimeRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTestReloading) {
      startTimeRef.current = Date.now();
      setIsContentReady(false);
    }
  }, [isTestReloading]);

  useEffect(() => {
    if (!isTestReloading && !isTestStarted) {
      const elapsed = startTimeRef.current
        ? (Date.now() - startTimeRef.current) / 1000
        : TRANSITION_DURATION;
      const remainingTime = Math.max(0, TRANSITION_DURATION - elapsed);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        updateDisplayedWords(targetWords);
        setIsContentReady(true);
        startTimeRef.current = null;
      }, remainingTime * 1000);

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [
    isTestReloading,
    isTestEnd,
    updateDisplayedWords,
    isTestStarted,
    targetWords,
  ]);

  useEffect(() => {
    if (startTestTime !== 0) updateDisplayedWords(targetWords);
  }, [targetWords, startTestTime, updateDisplayedWords]);

  const animationOpacity = isContentReady ? 1 : 0;

  useEffect(() => {
    updateAnimationOpacity(animationOpacity);
  }, [animationOpacity, updateAnimationOpacity]);
};
