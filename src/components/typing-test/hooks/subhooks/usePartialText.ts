import { useStore } from "@/store/store";
import { useCallback, useEffect, useState } from "react";
import { VISIBLE_WORDS_COUNT } from "../../typing-test.constants";

type UsePartialTextParams = {
  targetWords: string[];
  typedWords: string[];
  container: HTMLDivElement | null;
};

export const usePartialText = ({
  targetWords,
  typedWords,
  container,
}: UsePartialTextParams) => {
  const [startWordsIndex, setStartWordIndex] = useState(0);
  const isTestEnd = useStore((state) => state.isTestEnd);
  const isTestReloading = useStore((state) => state.isTestReloading);

  const update = useCallback(() => {
    const wordIndex = computeStartWordIndex({
      container,
      startWordsIndex,
      typedWords,
    });

    if (wordIndex) setStartWordIndex(wordIndex);
  }, [container, startWordsIndex, typedWords]);

  const endWordsIndex = Math.min(
    startWordsIndex + VISIBLE_WORDS_COUNT * 2,
    targetWords.length - 1
  );

  useEffect(() => {
    setStartWordIndex(0);
  }, [isTestEnd, isTestReloading]);

  return { startWordsIndex, endWordsIndex, update };
};

type ComputeStartLetterIndexParams = {
  container: HTMLDivElement | null;
  startWordsIndex: number;
  typedWords: string[];
};

const computeStartWordIndex = ({
  container,
  startWordsIndex,
  typedWords,
}: ComputeStartLetterIndexParams): number | undefined => {
  if (!container) return;

  const prevWords = collectWordElements({
    container,
    startWordsIndex,
    typedWords,
  });
  const offsetGroups = groupByWordOffset({ prevWords });

  console.log({ prevWords, offsetGroups });

  if (offsetGroups.length > 2) {
    const newStartWordIndex = offsetGroups[2].startIndex;
    return newStartWordIndex + 1;
  }
};

type WordElement = {
  wordIndex: number;
  offsetTop: number;
};
const collectWordElements = ({
  container,
  startWordsIndex,
  typedWords,
}: {
  container: HTMLDivElement;
  startWordsIndex: number;
  typedWords: string[];
}) => {
  if (!container) return [];

  const prevWords: WordElement[] = [];

  for (
    let wordIndexNow = typedWords.length - 1;
    wordIndexNow > startWordsIndex;
    wordIndexNow--
  ) {
    const word = container.querySelector(
      `[data-word-index="${wordIndexNow}"]`
    ) as HTMLElement;

    if (!word) break;

    prevWords.push({
      wordIndex: wordIndexNow,
      offsetTop: word.offsetTop,
    });
  }

  return prevWords;
};

type OffsetGroup = {
  offsetTop: number;
  startIndex: number;
  endIndex: number;
};
type GroupByWordOffsetProps = {
  prevWords: WordElement[];
};
const groupByWordOffset = ({ prevWords }: GroupByWordOffsetProps) => {
  const offsetGroups: OffsetGroup[] = [];
  let offsetNow;

  for (let i = 0; i < prevWords.length; i++) {
    const word = prevWords[i];
    if (offsetNow !== word.offsetTop) {
      offsetNow = word.offsetTop;
      offsetGroups.push({
        offsetTop: word.offsetTop,
        startIndex: word.wordIndex,
        endIndex: word.wordIndex,
      });
    } else {
      offsetGroups[offsetGroups.length - 1].endIndex = word.wordIndex;
    }
  }

  return offsetGroups;
};
