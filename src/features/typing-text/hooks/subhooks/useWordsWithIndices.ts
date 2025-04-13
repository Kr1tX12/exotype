import { useEffect } from "react";
import { useStore } from "@/store/store";

export type WordsWithIndices = {
  word: string;
  typedWord: string;
  absoluteIndex: number;
  startIndex: number;
  maxLength: number;
}[];

export const useWordsWithIndices = () => {
  const globalIndex = useStore((state) => state.globalIndex);
  const displayedWords = useStore((state) => state.displayedWords);
  const startWordsIndex = useStore((state) => state.startWordsIndex);
  const endWordsIndex = useStore((state) => state.endWordsIndex);
  const typedWords = useStore((state) => state.typedWords);
  const updateWordsWithIndices = useStore(
    (state) => state.updateWordsWithIndices
  );

  useEffect(() => {
    let currentGlobalIndex = globalIndex;
    const wordsWithIndices = displayedWords
      .slice(startWordsIndex, endWordsIndex + 1)
      .map((word, relativeIndex) => {
        const absoluteIndex = startWordsIndex + relativeIndex;
        const typedWord = typedWords[absoluteIndex] ?? "";
        const maxLength = Math.max(word.length, typedWord.length);
        const startIndex = currentGlobalIndex;
        currentGlobalIndex += maxLength + 1; // +1 для пробела
        return { word, typedWord, absoluteIndex, startIndex, maxLength };
      });

    updateWordsWithIndices(wordsWithIndices);
  }, [
    startWordsIndex,
    displayedWords,
    endWordsIndex,
    typedWords,
    globalIndex,
    updateWordsWithIndices,
  ]);
};
