import { useRef, useEffect } from "react";


// Нужен для рассчёта глобального индекса при помощи инкрементации.
// типо глобальный индекс откуда начинать считать, там же не с самого начала может быть текст
export const useGlobalIndex = (
  needWords: string[],
  typedWords: string[],
  startWordsIndex: number
) => {
  const initialGlobalIndexRef = useRef(0);
  const prevStartIndexRef = useRef(startWordsIndex);

  useEffect(() => {
    initialGlobalIndexRef.current = 0;
    prevStartIndexRef.current = 0;
  }, [needWords]);

  if (startWordsIndex !== prevStartIndexRef.current) {
    if (startWordsIndex > prevStartIndexRef.current) {
      for (let i = prevStartIndexRef.current; i < startWordsIndex; i++) {
        const typedWord = typedWords[i] ?? "";
        const word = needWords[i];
        initialGlobalIndexRef.current +=
          Math.max(word.length, typedWord.length) + 1;
      }
    } else {
      let total = 0;
      for (let i = 0; i < startWordsIndex; i++) {
        const typedWord = typedWords[i] ?? "";
        const word = needWords[i];
        total += Math.max(word.length, typedWord.length) + 1;
      }
      initialGlobalIndexRef.current = total;
    }
    prevStartIndexRef.current = startWordsIndex;
  }

  return initialGlobalIndexRef.current;
};
