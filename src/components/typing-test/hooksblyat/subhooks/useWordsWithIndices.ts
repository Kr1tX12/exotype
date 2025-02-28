import { useMemo } from "react";

export const useWordsWithIndices = ({
  initialGlobalIndex,
  displayedWords,
  startWordsIndex,
  endWordsIndex,
  typedWords,
}: {
  initialGlobalIndex: number;
  displayedWords: string[];
  startWordsIndex: number;
  endWordsIndex: number;
  typedWords: string[];
}) => {
  const wordsWithIndices = useMemo(() => {
    let currentGlobalIndex = initialGlobalIndex;
    return displayedWords
      .slice(startWordsIndex, endWordsIndex + 1)
      .map((word, relativeIndex) => {
        const absoluteIndex = startWordsIndex + relativeIndex;
        const typedWord = typedWords[absoluteIndex] ?? "";
        const maxLength = Math.max(word.length, typedWord.length);
        const startIndex = currentGlobalIndex;
        currentGlobalIndex += maxLength + 1; // +1 для пробела
        return { word, typedWord, absoluteIndex, startIndex, maxLength };
      });
  }, [
    startWordsIndex,
    displayedWords,
    endWordsIndex,
    typedWords,
    initialGlobalIndex,
  ]);

  return wordsWithIndices;
};
