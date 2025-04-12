import { useStore } from "@/store/store";
import { useState, useEffect, useRef } from "react";
import { TRANSITION_DURATION } from "../../typing-test.constants";
import {
  setAnimationOpacity,
  setDisplayedWords,
  useTypingDispatch,
  useTypingState,
} from "../../components/typing-provider";

export const useTextResetAnimation = () => {
  const dispatch = useTypingDispatch();

  const targetWords = useTypingState((state) => state.targetWords);
  const isTestReloading = useStore((state) => state.isTestReloading);
  const startTestTime = useStore((state) => state.startTestTime);
  //const [localDisplayedWords, setLocalDisplayedWords] =
  useState<string[]>(targetWords);
  const [isContentReady, setIsContentReady] = useState(true);
  const isTestEnd = useStore((state) => state.isTestEnd);
  const isTestStarted = useTypingState((state) => state.isTestStarted);

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
        setDisplayedWords(dispatch, targetWords);
        setIsContentReady(true);
        startTimeRef.current = null;
      }, remainingTime * 1000);

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [isTestReloading, isTestEnd, dispatch, targetWords]);

  useEffect(() => {
    if (startTestTime !== 0) setDisplayedWords(dispatch, targetWords);
  }, [targetWords, startTestTime, dispatch]);

  const animationOpacity = isContentReady ? 1 : 0;

  useEffect(() => {
    setAnimationOpacity(dispatch, animationOpacity);
  }, [animationOpacity, dispatch]);
};
