/*
  КАРИМ, ТЫ ТУПОЙ БАЛБЕС! 
  В этом решении мы фиксируем время начала загрузки и, когда isTestReloading становится false,
  вычисляем, сколько времени прошло. Если прошло меньше 0.15 сек – ждём оставшееся время,
  иначе показываем новый текст сразу.
*/

import { useStore } from "@/store/store";
import { useState, useEffect, useRef } from "react";

export const useTextResetAnimation = ({
  needWords,
}: {
  needWords: string[];
}) => {
  const isTestReloading = useStore((state) => state.isTestReloading);
  const [displayedWords, setDisplayedWords] = useState(needWords);
  const [isContentReady, setIsContentReady] = useState(true);
  const transitionDuration = 0.15; // минимальное время анимации в секундах

  // Фиксируем время начала загрузки
  const startTimeRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Когда начинается перезагрузка, скрываем контент и фиксируем время начала
  useEffect(() => {
    if (isTestReloading) {
      startTimeRef.current = Date.now();
      setIsContentReady(false);
    }
  }, [isTestReloading]);

  // Когда перезагрузка заканчивается (isTestReloading становится false) или приходит новый текст
  useEffect(() => {
    if (!isTestReloading) {
      // Вычисляем прошедшее время
      const elapsed = startTimeRef.current ? (Date.now() - startTimeRef.current) / 1000 : transitionDuration;
      const remainingTime = Math.max(0, transitionDuration - elapsed);
      
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setDisplayedWords(needWords);
        setIsContentReady(true);
        startTimeRef.current = null;
      }, remainingTime * 1000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isTestReloading, needWords]);

  const animationOpacity = isContentReady ? 1 : 0;

  return { animationOpacity, transitionDuration, displayedWords };
};
