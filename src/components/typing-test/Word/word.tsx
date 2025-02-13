import { memo, ReactNode } from "react";
import { Letter } from "../Letter/letter";
import { cn } from "@/lib/utils/utils";

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

export const Word = ({
  children,
  underlined,
}: {
  children: ReactNode;
  underlined: boolean;
}) => {
  return (
    <span
      className={cn(
        "inline-block transition-all ease-in-out border-b-2 border-transparent",
        underlined && " border-b-red-500"
      )}
    >
      {children}
    </span>
  );
};
