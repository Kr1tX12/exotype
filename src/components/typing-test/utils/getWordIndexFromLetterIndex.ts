interface GetWordIndexParams {
  letterIndex: number;
  typedWords: string[];
  needWords: string[];
}

// Нужно для того, чтобы находить последнее слово, которое нужно удалить для оптимизации...
// Потому что я по буквам искал. Ебать я даун. Потом переделаю. И эта херня не нужна будет.

export const getWordIndexFromLetterIndex = ({
  letterIndex,
  typedWords,
  needWords,
}: GetWordIndexParams): number => {
  let currentIndex = 0;
  for (let i = 0; i < typedWords.length; i++) {
    const wordLength = Math.max(typedWords[i].length, needWords[i].length);

    if (
      letterIndex >= currentIndex &&
      letterIndex < currentIndex + wordLength
    ) {
      return i;
    }

    currentIndex += wordLength + 1;
  }
  return typedWords.length - 1;
};
