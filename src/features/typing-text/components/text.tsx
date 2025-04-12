import { AnimatePresence } from "framer-motion";
import { renderLetters } from "../utils/renderLetters";
import { Caret } from "./caret";
import { Word } from "./word";
import { useTypingState } from "./typing-provider";
import { useStore } from "@/store/store";
import { RefObject } from "react";

export const Text = ({
  containerRef,
  caretRef,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
  caretRef: RefObject<HTMLDivElement | null>;
}) => {
  const isTestStarted = useTypingState((state) => state.isTestStarted);
  const wordsWithIndices = useTypingState((state) => state.wordsWithIndices);
  const typedWords = useTypingState((state) => state.typedWords);
  const typedText = useStore((state) => state.typedText);

  return (
    <div ref={containerRef} className="relative overflow-hidden w-full">
      <AnimatePresence mode={"popLayout"}>
        {wordsWithIndices.map(
          ({ word, typedWord, absoluteIndex, startIndex, maxLength }) => {
            const isTyping =
              typedWords.length - 1 === absoluteIndex &&
              typedWord.length > word.length;
            const animate = !isTyping && isTestStarted;

            return (
              <Word
                key={`word-${absoluteIndex}`}
                animate={animate}
                dataIndex={absoluteIndex}
              >
                {renderLetters({
                  word,
                  typedWord,
                  startIndex,
                  maxLength,
                  typedText,
                  absoluteIndex,
                  typedWords,
                })}
              </Word>
            );
          }
        )}
      </AnimatePresence>
      <Caret ref={caretRef} />
    </div>
  );
};

Text.displayName = "Text";
