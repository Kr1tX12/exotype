import { AnimatePresence } from "framer-motion";
import { renderLetters } from "../utils/renderLetters";
import { Caret } from "./caret";
import { Word } from "./word";
import { useStore } from "@/store/store";
import { memo } from "react";
import { useWordsWithIndices } from "../hooks/subhooks/useWordsWithIndices";
import { useTypingRefs } from "./refs-context";

export const Text = memo(() => {
  const { containerRef, caretRef } = useTypingRefs();
  
  const isTestStarted = useStore((state) => state.isTestStarted);
  const typedWords = useStore((state) => state.typedWords);
  const typedText = useStore((state) => state.typedText);

  const wordsWithIndices = useWordsWithIndices();

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
      <Caret containerRef={containerRef} caretRef={caretRef} ref={caretRef} />
    </div>
  );
});

Text.displayName = "Text";
