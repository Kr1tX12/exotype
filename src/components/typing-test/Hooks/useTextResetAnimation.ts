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
  const waitingForAnswer = useRef(false);

  const transitionDuration = 0.15 ;

  // При монтировании, если есть слова – запускаем fade‑in
  useEffect(() => {
    if (needWords.length > 0) {
      setIsContentReady(true);
    }
  }, []);

  // Эффект срабатывает при изменении needWords или при флаге перезагрузки теста.
  useEffect(() => {
    
    if (isTestReloading) {
      setIsContentReady(false);
      waitingForAnswer.current = true;
      setTimeout(() => {
        waitingForAnswer.current = false;
        if (useStore.getState().isTestReloading) return;
        setDisplayedWords(needWords);
        setIsContentReady(true);
      }, transitionDuration * 1000);
    } else if (!waitingForAnswer.current) {
      setDisplayedWords(needWords);
      setIsContentReady(true);
    }

    // Кто скажет что я тупой и убрал эту херню тот лох
    // без неё всё работает!!!!!!!!!!! А с ней не работает!!!!!
    // Эта строчка полное говно!!! Я её убрал!! Нахрен она нужна!!!!
    // вот это нахрен нужно с ней не работает →→→→ return () => clearTimeout(timer);
  }, [isTestReloading, needWords]);

  // Анимация контролируется флагом isContentReady:
  // если true → opacity: 1, иначе (false) → opacity: 0.
  const animationOpacity = isContentReady ? 1 : 0;

  return { animationOpacity, transitionDuration, displayedWords };
};
