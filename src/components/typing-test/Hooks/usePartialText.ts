
const visibleWordsCount = 25;
export const usePartialText = ({
  typedWords,
  needWords,
  startWordsIndex,
}: {
  typedWords: string[];
  needWords: string[];
  startWordsIndex: number;
}) => {
  const endWordsIndex = Math.min(
    startWordsIndex + visibleWordsCount * 2,
    needWords.length - 1
  );

  return { endWordsIndex };
};