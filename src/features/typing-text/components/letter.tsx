import { cn } from "@/shared/lib/utils";
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
  ({
    letter,
    isWritten,
    isWrong,
    isExtra,
    globalIndex,
    isUnderlined,
  }: LetterProps) => {
    return (
      <span
        data-index={globalIndex}
        className={cn(
          "border-b-2 border-transparent transition-[border-color]",
          isWrong && !isExtra && "text-wrong",
          isWritten && !isWrong && "text-typed-text",
          !isWritten && "text-target-text",
          isExtra && "text-extra-wrong",
          isUnderlined && "border-b-wrong",
          isUnderlined && isExtra && "border-extra-wrong"
        )}
      >
        {letter === " " ? "\u00A0" : letter}
      </span>
    );
  }
);

Letter.displayName = "Letter";
