import { memo, ReactNode } from 'react';
import { Letter } from '../Letter/letter';

type WordProps = {
  word: string;
  globalStart: number;
  text: string;
  typedWord: string;
};

// export const Word = memo(({ word, globalStart, text }: WordProps) => {
//   return (
//     // Оборачиваем слово в span; пробелы, входящие в слово, сохраняются
//     <span className="inline-block mr-5">
//       {Array.from(word).map((letter, i) => {
//         const globalIndex = globalStart + i;
//         const isWritten = globalIndex < text.length;
//         const isWrong =
//           isWritten && text[globalIndex] !== letter;
          
//         return (
//           <Letter
//             key={i}
//             letter={letter}
//             isWritten={isWritten}
//             isWrong={isWrong}
//             globalIndex={globalIndex}
//           />
//         );
//       })}
//     </span>
//   );
// });

export const Word = ({children}: {children: ReactNode}) => {
  return (
    <span className="inline-block mr-5">
      {children}
    </span>
  )
}