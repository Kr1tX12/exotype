import { useStore } from "@/store/store";
import { getWordIndexFromLetterIndex } from "../utils/getWordIndexFromLetterIndex";
import { useEffect, useState } from "react";

const visibleWordsCount = 25;
export const usePartialText = ({
  typedWords,
  needWords,
  prevLettersLength,
  container,
}: {
  typedWords: string[];
  needWords: string[];
  prevLettersLength: number;
  container: HTMLDivElement | null;
}) => {
  const [startWordsIndex, setStartWordsIndex] = useState(0);

  const update = () => {
    const newStartLetterIndex = getStartLetterIndex({
      container,
      typedWords,
      prevLettersLength,
    });
    if (newStartLetterIndex) {
      const startWordIndex =
        getWordIndexFromLetterIndex({
          letterIndex: newStartLetterIndex,
          typedWords,
          needWords,
        }) + 1;

      console.log({ index: startWordIndex, word: needWords[startWordIndex] });

      setStartWordsIndex(startWordIndex);
    }
  };

  const endWordsIndex = Math.min(
    startWordsIndex + visibleWordsCount * 2,
    needWords.length - 1
  );

  useEffect(() => {
    setStartWordsIndex(0);
  }, [needWords]);

  return { endWordsIndex, startWordsIndex, update };
};

const getStartLetterIndex = ({
  container,
  typedWords,
  prevLettersLength,
}: {
  container: HTMLDivElement | null;
  typedWords: string[];
  prevLettersLength: number;
}) => {
  if (!container) return;
  const { typedText } = useStore.getState();
  const startIndex =
    typedText[typedText.length - 1] === " "
      ? prevLettersLength + typedWords[typedWords.length - 1].length
      : prevLettersLength + typedWords[typedWords.length - 1].length - 1;

  // СНАЧАЛА БЛЯТЬ СТРОКА ГДЕ ПОЛЬЗОВАТЕЛЬ, ПОТОМ ВЫШЕ СТРОКИ
  const linesY: {
    y: number;
    i: number;
  }[] = [];

  // Заполняем LINESY ВСЕМИ БУКВАМи Которые ПОЛЬЗОватель Уже НАПисал
  let i = startIndex;
  while (true) {
    const target = container.querySelector(
      `[data-index="${i}"]`
    ) as HTMLElement;

    if (!target) break;

    linesY.push({ y: target.offsetTop, i });

    i--;
  }

  // ГРУППИРУЕМ ПО ВЫСОТЕЕЕЕЕЕЕ! ЧТОБЫ ПОТОМ УДАЛИТЬ, КОТОРЫЕ НЕ ВИДНО!!!!
  const yGroups: { y: number; startIndex: number; endIndex: number }[] = [];

  linesY.forEach((item) => {
    if (yGroups.length === 0) {
      yGroups.push({ y: item.y, startIndex: item.i, endIndex: item.i });
    } else {
      const lastGroup = yGroups[yGroups.length - 1];

      if (lastGroup.y === item.y) {
        lastGroup.startIndex = item.i;
      } else {
        yGroups.push({ y: item.y, startIndex: item.i, endIndex: item.i });
      }
    }
  });

  if (yGroups.length > 2) {
    const groupToDelete = yGroups[2];
    const lastGroupLetterRaw = groupToDelete.endIndex;
    const lastGroupLetter =
      (
        container.querySelector(
          `[data-index="${lastGroupLetterRaw}"]`
        ) as HTMLElement
      ).textContent?.charCodeAt(0) === 160
        ? lastGroupLetterRaw - 1
        : lastGroupLetterRaw;

    return lastGroupLetter;
  }
};
