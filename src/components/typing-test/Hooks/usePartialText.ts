const visibleWordsCount = 3;
export const usePartialText = ({
  typedWords,
  needWords,
}: {
  typedWords: string[];
  needWords: string[];
}) => {
  const startWordsIndex = Math.max(0, typedWords.length - visibleWordsCount);
  const endWordsIndex = Math.min(
    startWordsIndex + visibleWordsCount * 2,
    needWords.length - 1
  );

  return { startWordsIndex, endWordsIndex };
};