import { cn } from "@/lib/utils/utils";
import { memo } from "react";

type LetterProps = {
  letter: string;
  isWritten: boolean;
  isWrong: boolean;
  isExtra: boolean;
  globalIndex: number;
};

// Компонент Letter теперь включает классы CSS для плавного перехода цвета
export const Letter = memo(
  ({ letter, isWritten, isWrong, isExtra, globalIndex }: LetterProps) => {
    console.log(`words ${letter} rerender`);
    return (
      <span
        data-index={globalIndex}
        className={cn(
          "transition-colors duration-200 ease-in-out", // добавлен плавный переход цвета
          isWrong && !isExtra && "text-red-500 wrong-letter-shadow",
          isWritten && !isWrong && "text-foreground correct-letter-shadow",
          !isWritten && "text-muted-foreground/50",
          isExtra && "text-red-900"
        )}
      >
        {letter === " " ? "\u00A0" : letter}
      </span>
    );
  }
);

export default Letter;
