import { useRef, useEffect } from "react";
import { useStore } from "@/store/store";

export const useGlobalIndex = () => {
  const targetWords = useStore((state) => state.targetWords);
  const typedWords = useStore((state) => state.typedWords);
  const startWordsIndex = useStore((state) => state.startWordsIndex);
  const updateGlobalIndex = useStore((state) => state.updateGlobalIndex);

  const globalIndexRef = useRef(0);
  const prevStartIndexRef = useRef(startWordsIndex);

  useEffect(() => {
    // O(n) редко
    globalIndexRef.current = 0;
    prevStartIndexRef.current = startWordsIndex;
    for (let i = 0; i < startWordsIndex; i++) {
      globalIndexRef.current +=
        Math.max(targetWords[i]?.length ?? 0, typedWords[i]?.length ?? 0) + 1;
    }
    updateGlobalIndex(globalIndexRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetWords, startWordsIndex]);

  // O(k) каждый символ
  useEffect(() => {
    const delta = startWordsIndex - prevStartIndexRef.current;
    if (delta !== 0) {
      if (delta > 0) {
        for (let i = prevStartIndexRef.current; i < startWordsIndex; i++) {
          globalIndexRef.current +=
            Math.max(targetWords[i]?.length ?? 0, typedWords[i]?.length ?? 0) +
            1;
        }
      } else {
        for (let i = startWordsIndex; i < prevStartIndexRef.current; i++) {
          globalIndexRef.current -=
            Math.max(targetWords[i]?.length ?? 0, typedWords[i]?.length ?? 0) +
            1;
        }
      }
      prevStartIndexRef.current = startWordsIndex;

      updateGlobalIndex(globalIndexRef.current);
    }
  }, [targetWords, typedWords, startWordsIndex, updateGlobalIndex]);
};
