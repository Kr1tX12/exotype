"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Caret } from "./components/caret";
import { Word } from "./components/word";
import { useTypingHandler } from "./hooks/useTypingHandler";
import { renderLetters } from "./utils/renderLetters";
import { TestProgress } from "./components/test-progress";

const containerVariants = (opacity: number, duration: number) => ({
  hidden: { opacity: 0 },
  visible: { opacity, transition: { duration } },
});

// Основной компонент для практики печати (❁´◡`❁) ❤❤❤❤❤❤
// типо тут текст и его нужно писать ☜(ﾟヮﾟ☜) ❤❤❤❤

export const TypingText = () => {
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
  } = useTypingHandler();

  return (
    <motion.div
      className="relative whitespace-pre-wrap text-[2.5rem] max-sm:text-[1.4rem] max-md:text-[1.6rem] max-lg:text-[1.8rem] max-xl:text-[2rem] leading-snug flex flex-col gap-2 w-full"
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

        {/* Для мобилок ❤❤ */}
        <input
          autoFocus
          tabIndex={-1}
          className="absolute opacity-0 top-0 left-0 size-full cursor-none"
          onChange={handleMobileInput}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </div>
    </motion.div>
  );
};

export default TypingText;
