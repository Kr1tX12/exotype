import { useStore } from "@/store/store";
import { useState, useEffect } from "react";

export const useTextResetAnimation = ({ needWords }: { needWords: string[] }) => {
  const isTestReloading = useStore((state) => state.isTestReloading);
  const [displayedWords, setDisplayedWords] = useState(needWords);
  const [isContentReady, setIsContentReady] = useState(false);

  const transitionDuration = 0.15;

  // При монтировании, если есть слова – запускаем fade‑in
  useEffect(() => {
    if (needWords.length > 0) {
      setIsContentReady(true);
    }
  }, []);

  // Эффект срабатывает при изменении needWords или при флаге перезагрузки теста.
  useEffect(() => {
    // Сначала запускаем анимацию исчезновения (fade‑out)

    let timer: NodeJS.Timeout;

    if (isTestReloading) {
      setIsContentReady(false);
      timer = setTimeout(() => {
        if (JSON.stringify(needWords) === JSON.stringify(displayedWords)) {
          return;
        }
        setDisplayedWords(needWords);
        setIsContentReady(true);
      }, transitionDuration * 1000);
    } else {
      setDisplayedWords(needWords);
      setIsContentReady(true);
    }

    return () => clearTimeout(timer);
  }, [isTestReloading, needWords]);

  // Анимация контролируется флагом isContentReady:
  // если true → opacity: 1, иначе (false) → opacity: 0.
  const animationOpacity = isContentReady ? 1 : 0;

  return { animationOpacity, transitionDuration, displayedWords };
};
