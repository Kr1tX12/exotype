import { useEffect } from "react";
import {
  setWordsWithIndices,
  useTypingDispatch,
  useTypingState,
} from "../../components/typing-provider";

export type WordsWithIndices = {
  word: string;
  typedWord: string;
  absoluteIndex: number;
  startIndex: number;
  maxLength: number;
}[];

export const useWordsWithIndices = () => {
  const dispatch = useTypingDispatch();

  const initialGlobalIndex = useTypingState(
    (state) => state.initialGlobalIndex
  );
  const displayedWords = useTypingState((state) => state.displayedWords);
  const startWordsIndex = useTypingState((state) => state.startWordsIndex);
  const endWordsIndex = useTypingState((state) => state.endWordsIndex);
  const typedWords = useTypingState((state) => state.typedWords);

  useEffect(() => {
    let currentGlobalIndex = initialGlobalIndex;
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

    setWordsWithIndices(dispatch, wordsWithIndices);
  }, [
    startWordsIndex,
    displayedWords,
    endWordsIndex,
    typedWords,
    initialGlobalIndex,
    dispatch,
  ]);
};
