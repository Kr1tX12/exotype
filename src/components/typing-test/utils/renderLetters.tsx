import { Letter } from "../components/letter";


// Эта херня возвращает буквы <Letter /> 
// Для каждого слова, которые будут зарендерены!
export const renderLetters = ({
  word,
  typedWord,
  startIndex,
  maxLength,
}: {
  word: string;
  typedWord: string;
  startIndex: number;
  maxLength: number;
}) => {
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
    />
  );
  return letters;
};
