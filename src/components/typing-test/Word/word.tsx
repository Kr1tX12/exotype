import { Letter } from '../Letter/letter';

type WordProps = {
  word: string;
  globalStart: number;
  text: string;
};

export const Word = ({ word, globalStart, text }: WordProps) => {
  return (
    // Оборачиваем слово в span; пробелы, входящие в слово, сохраняются
    <span className="inline-block">
      {Array.from(word).map((letter, i) => {
        const globalIndex = globalStart + i;
        const isWritten = globalIndex < text.length;
        const isWrong =
          isWritten && text[globalIndex] !== letter;
        return (
          <Letter
            key={i}
            letter={letter}
            isWritten={isWritten}
            isWrong={isWrong}
            globalIndex={globalIndex}
          />
        );
      })}
    </span>
  );
};