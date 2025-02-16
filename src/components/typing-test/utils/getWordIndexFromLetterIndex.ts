interface GetWordIndexParams {
  letterIndex: number;
  typedWords: string[];
  needWords: string[];
}

export const getWordIndexFromLetterIndex = ({
  letterIndex,
  typedWords,
  needWords,
}: GetWordIndexParams): number => {
  let currentIndex = 0;
  for (let i = 0; i < typedWords.length; i++) {
    const wordLength = Math.max(typedWords[i].length, needWords[i].length);

    // Check if the letterIndex falls within the current word's character indices.
    if (
      letterIndex >= currentIndex &&
      letterIndex < currentIndex + wordLength
    ) {
      return i;
    }

    // Move the pointer to the start of the next word.
    // We add 1 for the space separator that exists between words in typedText.
    currentIndex += wordLength + 1;
  }

  // If the letterIndex goes beyond any word boundary, return the last word index as fallback.
  return typedWords.length - 1;
};
