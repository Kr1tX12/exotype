import { useLayoutEffect, useRef } from "react";
import { useStore } from "@/store/store";


// здесь нечего оптимизировать
export const useCompletedWordsLength = () => {
  const typedWords = useStore((state) => state.typedWords);
  const targetWords = useStore((state) => state.targetWords);
  const updateCompleteWordsLength = useStore(
    (state) => state.updateCompleteWordsLength
  );
  const contributionsRef = useRef<number[]>([]);
  const totalRef = useRef<number>(0);
  const prevTargetRef = useRef<string[]>(targetWords);

  useLayoutEffect(() => {
    if (prevTargetRef.current !== targetWords) {
      prevTargetRef.current = targetWords;
      contributionsRef.current = [];
      totalRef.current = 0;
    }

    const newCompleteWords = typedWords.length > 0 ? typedWords.length - 1 : 0;
    const currentContribCount = contributionsRef.current.length;

    if (newCompleteWords > currentContribCount) {
      for (let i = currentContribCount; i < newCompleteWords; i++) {
        const contribution =
          Math.max(targetWords[i]?.length || 0, typedWords[i]?.length || 0) + 1;
        contributionsRef.current.push(contribution);
        totalRef.current += contribution;
      }
    } else if (newCompleteWords < currentContribCount) {
      while (contributionsRef.current.length > newCompleteWords) {
        const removed = contributionsRef.current.pop() || 0;
        totalRef.current -= removed;
      }
    }

    updateCompleteWordsLength(totalRef.current);
  }, [typedWords, targetWords, updateCompleteWordsLength]);
};
