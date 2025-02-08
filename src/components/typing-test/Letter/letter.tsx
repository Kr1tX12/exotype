import { cn } from "@/lib/utils";
import { memo } from "react";

type LetterProps = {
  letter: string;
  isWritten: boolean;
  isWrong: boolean;
  globalIndex: number;
};

// Компонент Letter теперь включает классы CSS для плавного перехода цвета
export const Letter = memo(
  ({ letter, isWritten, isWrong, globalIndex }: LetterProps) => {
    return (
      <span
        data-index={globalIndex}
        className={cn(
          "transition-colors duration-200 ease-in-out", // добавлен плавный переход цвета
          isWrong && "text-red-500 wrong-letter-shadow", 
          isWritten &&
            !isWrong &&
            "text-foreground correct-letter-shadow",
          !isWritten && "text-muted-foreground"
        )}
      >
        {letter === " " ? "\u00A0" : letter}
      </span>
    );
  }
);

export default Letter;
