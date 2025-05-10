import { Letter } from "../components/letter";

const MAX_CACHE_SIZE = 30;

const letterCache = new Map<string, React.ReactElement[]>();

export const renderLetters = ({
  word,
  typedWord,
  startIndex,
  maxLength,
  absoluteIndex,
  typedText,
  typedWords,
}: {
  word: string;
  typedWord: string;
  startIndex: number;
  maxLength: number;
  absoluteIndex: number;
  typedText: string;
  typedWords: string[];
}) => {
  const key = `${word}_${typedWord}`;

  if (letterCache.has(key)) {
    // Поднимаем элемент в конец (считаем что он теперь "свежий")
    const value = letterCache.get(key)!;
    letterCache.delete(key);
    letterCache.set(key, value);
    return value;
  }

  const underlined = Boolean(
    typedWord &&
      typedWord !== word &&
      (typedWords[absoluteIndex + 1] || typedText[typedText.length - 1] === " ")
  );

  const letters = [];

  for (let i = 0; i < maxLength; i++) {
    const letter = i < word.length ? word[i] : typedWord[i] || "";
    const isWritten = i < typedWord.length;
    const isExtra = i >= word.length;
    const isWrong = isWritten && (letter !== typedWord[i] || isExtra);

    letters.push(
      <Letter
        key={`${startIndex}-${i}`}
        letter={letter}
        isWrong={isWrong}
        isWritten={isWritten}
        isExtra={isExtra}
        globalIndex={startIndex + i}
        isUnderlined={underlined}
      />
    );
  }

  letters.push(
    <Letter
      key={startIndex + maxLength}
      letter=" "
      isWrong={false}
      isWritten={false}
      isExtra={false}
      globalIndex={startIndex + maxLength}
      isUnderlined={false}
    />
  );

  // ⚠️ Если размер кэша превышен — удаляем самый первый (наименее использованный)
  if (letterCache.size >= MAX_CACHE_SIZE) {
    const firstKey = letterCache.keys().next().value;
    if (firstKey) letterCache.delete(firstKey);
  }

  letterCache.set(key, letters);

  return letters;
};

export const clearLettersCache = () => letterCache.clear();
