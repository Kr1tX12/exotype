import { useMemo, useRef, useEffect } from "react";

interface UseCompletedWordsLengthProps {
  typedWords: string[];
  targetWords: string[];
}

export const useCompletedWordsLength = ({
  typedWords,
  targetWords,
}: UseCompletedWordsLengthProps) => {
  // Хранит вклад каждого завершённого слова: длина + пробел.
  const contributionsRef = useRef<number[]>([]);
  // Аккумулированная сумма вкладов.
  const totalRef = useRef<number>(0);
  // Для контроля изменений целевого набора слов, если он сменился.
  const prevTargetRef = useRef<string[]>(targetWords);

  const completedWordsLength = useMemo(() => {
    // Если массив целевых слов сменился по ссылке, сбрасываем кэш.
    if (prevTargetRef.current !== targetWords) {
      prevTargetRef.current = targetWords;
      contributionsRef.current = [];
      totalRef.current = 0;
    }

    const newCompleteWords = typedWords.length > 0 ? typedWords.length - 1 : 0;
    const currentContribCount = contributionsRef.current.length;

    // Если добавили новые слова, обновляем инкрементально.
    if (newCompleteWords > currentContribCount) {
      for (let i = currentContribCount; i < newCompleteWords; i++) {
        const contribution =
          Math.max(targetWords[i]?.length || 0, typedWords[i]?.length || 0) + 1;
        contributionsRef.current.push(contribution);
        totalRef.current += contribution;
      }
    }
    // Если удалили одно или несколько слов (например, Ctrl+Backspace).
    else if (newCompleteWords < currentContribCount) {
      while (contributionsRef.current.length > newCompleteWords) {
        const removed = contributionsRef.current.pop() || 0;
        totalRef.current -= removed;
      }
    }
    return totalRef.current;
  }, [typedWords, targetWords]);

  // Синхронизируем инкрементальное значение с каждым рендером.
  useEffect(() => {
    // Ничего не делаем, так как useMemo уже обновил totalRef,
    // но можно использовать effect для отладки или будущих нужд.
  }, [completedWordsLength, typedWords]);

  return completedWordsLength;
};
