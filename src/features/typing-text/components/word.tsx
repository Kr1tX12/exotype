import {
  memo,
  ReactNode,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, usePresence } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { renderLetters } from "../utils/renderLetters";

const baseTransition = { duration: 0.2, ease: "easeInOut" };

const wordVariants = {
  initial: { y: 0, opacity: 1 },
  exit: {
    y: -40,
    opacity: 0,
    transition: baseTransition,
  },
};

interface WordProps {
  animate: boolean;
  dataIndex: number;
  word: string;
  typedWords: string[];
  typedWord: string;
  startIndex: number;
  maxLength: number;
  typedText: string;
  absoluteIndex: number;
}
export const Word = memo(
  ({
    animate,
    dataIndex,
    word,
    typedWords,
    typedWord,
    startIndex,
    maxLength,
    typedText,
    absoluteIndex,
  }: WordProps) => {
    const letters = useMemo(
      () =>
        renderLetters({
          word,
          typedWord,
          startIndex,
          maxLength,
          typedText,
          absoluteIndex,
          typedWords,
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [word, typedWord]
    );

    return animate ? (
      <AnimatedWord dataIndex={dataIndex}>{letters}</AnimatedWord>
    ) : (
      <NoAnimationWord dataIndex={dataIndex}>{letters}</NoAnimationWord>
    );
  }
);

type RealWordProps = {
  children: ReactNode;
  dataIndex: number;
};

const AnimatedWord = ({ children, dataIndex }: RealWordProps) => {
  const wordRef = useRef<HTMLSpanElement>(null);
  const [absolutePosition, setAbsolutePosition] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const [isPresent, safeToRemove] = usePresence();

  useLayoutEffect(() => {
    if (!isPresent && wordRef.current) {
      const parent = wordRef.current.offsetParent as HTMLElement;
      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const wordRect = wordRef.current.getBoundingClientRect();
        setAbsolutePosition({
          left: wordRect.left - parentRect.left,
          top: wordRect.top - parentRect.top,
        });
      }
    }
  }, [isPresent]);

  return (
    <motion.span
      data-word-index={dataIndex}
      ref={wordRef}
      variants={wordVariants}
      exit="exit"
      onAnimationComplete={() => {
        if (!isPresent) safeToRemove(); // Удаляем элемент из DOM после анимации
      }}
      className={cn("inline-block transition-colors")}
      layout
      style={
        !isPresent && absolutePosition
          ? {
              position: "absolute",
              left: absolutePosition.left,
              top: absolutePosition.top,
            }
          : undefined
      }
    >
      {children}
    </motion.span>
  );
};

const NoAnimationWord = ({ children, dataIndex }: RealWordProps) => {
  return (
    <span
      data-word-index={dataIndex}
      className={cn("inline-block transition-colors")}
    >
      {children}
    </span>
  );
};

Word.displayName = "Word";
