import { memo, ReactNode } from "react";
import { Letter } from "../Letter/letter";
import { cn } from "@/lib/utils/utils";

type WordProps = {
  word: string;
  globalStart: number;
  text: string;
  typedWord: string;
};


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
