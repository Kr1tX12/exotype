import { useRef, useMemo, useEffect } from "react";

export const usePrevLettersLength = ({
  typedWords,
  needWords,
  typedText,
}: {
  typedWords: string[];
  needWords: string[];
  typedText: string;
}) => {
  // Реф для хранения числа завершённых слов
  const prevCompleteWords = useRef<number>(0);
  const prevLettersLengthRef = useRef<number>(0);

  // -------------------
  // ВЫЧИСЛЯЕМ prevLettersLength БЕЗ СРАНОГО useState
  // -------------------
  const prevLettersLength = useMemo(() => {
    // Определяем число завершённых слов.
    // Если текст пустой, то их 0. Если есть слова – последнее слово может быть незавершённым,
    // поэтому число завершённых слов = общее число слов - 1 (если хотя бы одно слово есть).
    const newCompleteWords = typedWords.length > 0 ? typedWords.length - 1 : 0;
    let newPrevLettersLength = prevLettersLengthRef.current;

    // Если вдруг разница больше 1 (например, вставка/удаление нескольких слов сразу) — пересчитываем полностью
    if (Math.abs(newCompleteWords - prevCompleteWords.current) > 1) {
      return typedWords
        .slice(0, typedWords.length - 1)
        .reduce(
          (acc, _, i) =>
            acc +
            (Math.max(needWords[i]?.length || 0, typedWords[i].length) + 1),
          0
        );
    }

    // Если добавлено одно слово – прибавляем инкрементально
    if (newCompleteWords > prevCompleteWords.current) {
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
            needWords[indexRemoved]?.length || 0, // Добавляем проверку на существование
            typedWords[indexRemoved]?.length || 0
          ) +
            1)
      );
    }

    return newPrevLettersLength;
  }, [typedText, typedWords]);

  useEffect(() => {
    prevCompleteWords.current = 0;
    prevLettersLengthRef.current = 0;
  }, [needWords]);

  // -------------------
  // ОБНОВЛЯЕМ ЗНАЧЕНИЕ В РЕФЕ, ЧТОБЫ НЕ БЫЛО ХЕРНИ
  // -------------------
  useEffect(() => {
    prevCompleteWords.current =
      typedWords.length > 0 ? typedWords.length - 1 : 0;
    prevLettersLengthRef.current = prevLettersLength;
  }, [prevLettersLength, typedWords]);

  return prevLettersLength;
};
