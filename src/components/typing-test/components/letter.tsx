import { cn } from "@/lib/utils";
import { memo } from "react";

type LetterProps = {
  letter: string;
  isWritten: boolean;
  isWrong: boolean;
  isExtra: boolean;
  isUnderlined: boolean;
  globalIndex: number;
};

export const Letter = memo(
  ({ letter, isWritten, isWrong, isExtra, globalIndex, isUnderlined }: LetterProps) => {
    return (
      <span
        data-index={globalIndex}
        className={cn(
          "transition-colors duration-200 ease-in-out border-b-2 border-transparent",
          isWrong && !isExtra && "text-red-500 wrong-letter-shadow",
          isWritten && !isWrong && "text-foreground correct-letter-shadow",
          !isWritten && "text-muted-foreground/50",
          isExtra && "text-red-900",
          isUnderlined && "border-b-red-500",
          isUnderlined && isExtra && "border-b-red-900",
        )}
      >
        {letter === " " ? "\u00A0" : letter}
      </span>
    );
  }
);

Letter.displayName = "Letter";
