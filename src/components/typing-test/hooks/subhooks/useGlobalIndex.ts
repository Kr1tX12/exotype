import { useRef, useEffect } from "react";

export const useGlobalIndex = (
  needWords: string[],
  typedWords: string[],
  startWordsIndex: number
) => {
  const globalIndexRef = useRef(0);
  const prevStartIndexRef = useRef(startWordsIndex);

  useEffect(() => {
    globalIndexRef.current = 0;
    prevStartIndexRef.current = startWordsIndex;
    for (let i = 0; i < startWordsIndex; i++) {
      globalIndexRef.current += Math.max(needWords[i]?.length ?? 0, typedWords[i]?.length ?? 0) + 1;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needWords, startWordsIndex]);

  const delta = startWordsIndex - prevStartIndexRef.current;
  if (delta !== 0) {
    if (delta > 0) {
      for (let i = prevStartIndexRef.current; i < startWordsIndex; i++) {
        globalIndexRef.current += Math.max(needWords[i]?.length ?? 0, typedWords[i]?.length ?? 0) + 1;
      }
    } else {
      for (let i = startWordsIndex; i < prevStartIndexRef.current; i++) {
        globalIndexRef.current -= Math.max(needWords[i]?.length ?? 0, typedWords[i]?.length ?? 0) + 1;
      }
    }
    prevStartIndexRef.current = startWordsIndex;
  }

  return globalIndexRef.current;
};
