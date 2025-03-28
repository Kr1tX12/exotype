import { useMemo, useRef } from "react";

interface UseCompletedWordsLengthProps {
  typedWords: string[];
  targetWords: string[];
}

export const useCompletedWordsLength = ({
  typedWords,
  targetWords,
}: UseCompletedWordsLengthProps) => {
  const contributionsRef = useRef<number[]>([]);
  const totalRef = useRef<number>(0);
  const prevTargetRef = useRef<string[]>(targetWords);

  const completedWordsLength = useMemo(() => {
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
    }
    else if (newCompleteWords < currentContribCount) {
      while (contributionsRef.current.length > newCompleteWords) {
        const removed = contributionsRef.current.pop() || 0;
        totalRef.current -= removed;
      }
    }
    return totalRef.current;
  }, [typedWords, targetWords]);
  
  return completedWordsLength;
};
