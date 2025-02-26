import { memo, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Переиспользуемый базовый переход
const baseTransition = { duration: 0.2, ease: "easeInOut" };

// Варианты для компонента Word
const wordVariants = {
  exit: { y: -40, opacity: 0, transition: baseTransition },
};

export const Word = memo(
  ({
    children,
    underlined,
    isWriting,
  }: {
    children: ReactNode;
    underlined: boolean;
    isWriting: boolean;
  }) => {
    return (
      <motion.span
        variants={wordVariants}
        exit="exit"
        className={cn(
          "inline-block border-b-2 border-transparent transition-colors",
          underlined && "border-b-red-500"
        )}
        {...(!isWriting && { layout: true })}
      >
        {children}
      </motion.span>
    );
  }
);

Word.displayName = "Word";
