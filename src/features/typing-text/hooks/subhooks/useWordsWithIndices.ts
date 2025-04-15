import { useEffect, useRef, useState } from "react";
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

  const prevStartWordsIndex = useRef(-1);
  const wordsWithIndicesRef = useRef<WordsWithIndices>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, forceUpdate] = useState(0);

  useEffect(() => {
    let currentGlobalIndex = globalIndex;

    if (prevStartWordsIndex.current !== startWordsIndex || typedWords[0]?.trim() === "") {
      console.log("full");
      wordsWithIndicesRef.current = displayedWords
        .slice(startWordsIndex, endWordsIndex + 1)
        .map((word, relativeIndex) => {
          const absoluteIndex = startWordsIndex + relativeIndex;
          const typedWord = typedWords[absoluteIndex] ?? "";
          const maxLength = Math.max(word.length, typedWord.length);
          const startIndex = currentGlobalIndex;
          currentGlobalIndex += maxLength + 1; // +1 для пробела
          return { word, typedWord, absoluteIndex, startIndex, maxLength };
        });
    } else {
      console.log("incrementing");

      const copyWordsWithIndices = [...wordsWithIndicesRef.current];
      copyWordsWithIndices.forEach((wordWithIndeces, relativeIndex) => {
        if (
          typedWords[wordWithIndeces.absoluteIndex] ===
          wordWithIndeces.typedWord
        )
          return;
        const typedWord = typedWords[wordWithIndeces.absoluteIndex] ?? "";
        wordsWithIndicesRef.current[relativeIndex].typedWord = typedWord;
      });
    }

    forceUpdate((n) => n + 1);
    prevStartWordsIndex.current = startWordsIndex;
  }, [startWordsIndex, displayedWords, endWordsIndex, typedWords, globalIndex]);

  return wordsWithIndicesRef.current;
};
