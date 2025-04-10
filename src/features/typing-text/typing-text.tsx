"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Caret } from "./components/caret";
import { Word } from "./components/word";
import { useTypingHandler } from "./hooks/useTypingHandler";
import { renderLetters } from "./utils/renderLetters";
import { TestProgress } from "./components/test-progress";
import { useRef, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { AlwaysFocusedInput } from "./components/always-focused-input";

const containerVariants = (opacity: number, duration: number) => ({
  hidden: { opacity: 0 },
  visible: { opacity, transition: { duration } },
});

export const TypingText = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  const {
    targetWords,
    caretRef,
    containerRef,
    typedWords,
    typedText,
    animationOpacity,
    transitionDuration,
    wordsWithIndices,
    wpm,
    handleMobileInput,
    isTestStarted,
  } = useTypingHandler(inputRef);

  return (
    <div
      className={cn(
        "relative size-full flex mb-36 justify-center items-center"
      )}
    >
      <motion.div
        className={cn(
          isFocused ? "cursor-none" : "cursor-pointer blur-sm",
          "transition-[--tw-blur] relative whitespace-pre-wrap text-[3rem] max-sm:text-[1.2rem] max-md:text-[2rem] max-lg:text-[2.5rem] max-xl:text-[2.7rem] leading-snug flex flex-col gap-2 w-full"
        )}
        variants={containerVariants(animationOpacity, transitionDuration)}
        initial="hidden"
        animate="visible"
      >
        {/* Счёткики ❤ */}
        <motion.div
          animate={{ opacity: typedText.length > 0 ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex gap-4"
        >
          <div className="flex flex-col items-center leading-none text-primary">
            <p className="text-3xl font-medium">{wpm}</p>
          </div>
        </motion.div>

        <TestProgress typedWords={typedWords} targetWords={targetWords} />

        {/* Слова ❤❤❤❤❤❤❤❤❤❤❤❤ */}
        <div ref={containerRef} className="relative overflow-hidden w-full">
          <AnimatePresence
            initial={false}
            mode={"popLayout"}
            key={`${isTestStarted}`}
          >
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
      </motion.div>
      {/* Для мобилок ❤❤ */}
      <AlwaysFocusedInput
        isFocused={isFocused}
        ref={inputRef}
        setIsFocused={setIsFocused}
        onMobileInput={handleMobileInput}
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: isFocused ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none text-muted-foreground font-semibold text-xl absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1/2"
      >
        Click to focus
      </motion.p>
    </div>
  );
};

export default TypingText;
