import { useRef, useMemo, useEffect } from "react";

export const usePrevLettersLength = ({
  typedWords,
  needWords,
}: {
  typedWords: string[];
  needWords: string[];
}) => {
  const prevCompleteWords = useRef<number>(0);
  const prevLettersLengthRef = useRef<number>(0);
  // Новый ref для хранения предыдущего значения needWords
  const prevNeedWords = useRef<string[]>(needWords);

  const prevLettersLength = useMemo(() => {
    // Если needWords изменился, сбрасываем накопленные значения
    if (prevNeedWords.current !== needWords) {
      prevNeedWords.current = needWords;
      prevCompleteWords.current = 0;
      prevLettersLengthRef.current = 0;
    }

    const newCompleteWords = typedWords.length > 0 ? typedWords.length - 1 : 0;
    let newPrevLettersLength = prevLettersLengthRef.current;

    // Если разница в числе завершённых слов больше 1 – пересчитываем полностью
    if (Math.abs(newCompleteWords - prevCompleteWords.current) > 1) {
      newPrevLettersLength = typedWords
        .slice(0, typedWords.length - 1)
        .reduce(
          (acc, _, i) =>
            acc +
            (Math.max(needWords[i]?.length || 0, typedWords[i].length) + 1),
          0
        );
    }
    // Если добавлено одно слово – прибавляем инкрементально
    else if (newCompleteWords > prevCompleteWords.current) {
      const indexAdded = newCompleteWords - 1;
      newPrevLettersLength +=
        Math.max(
          needWords[indexAdded]?.length || 0,
          typedWords[indexAdded].length
        ) + 1;
    }
    // Если удалено одно слово – вычитаем инкрементально
    else if (newCompleteWords < prevCompleteWords.current) {
      const indexRemoved = prevCompleteWords.current - 1;
      newPrevLettersLength = Math.max(
        0,
        newPrevLettersLength -
          (Math.max(
            needWords[indexRemoved]?.length || 0,
            typedWords[indexRemoved]?.length || 0
          ) + 1)
      );
    }
    return newPrevLettersLength;
  }, [typedWords, needWords]);

  // Обновляем рефы для последующих вычислений
  useEffect(() => {
    prevCompleteWords.current =
      typedWords.length > 0 ? typedWords.length - 1 : 0;
    prevLettersLengthRef.current = prevLettersLength;
  }, [prevLettersLength, typedWords]);

  return prevLettersLength;
};
