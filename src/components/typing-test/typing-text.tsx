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

// Основной компонент для практики печати (❁´◡`❁)
// типо тут текст и его нужно писать ☜(ﾟヮﾟ☜)

export const TypingText = () => {
  const {
    needWords,
    caretRef,
    containerRef,
    typedWords,
    typedText,
    animationOpacity,
    transitionDuration,
    wordsWithIndices,
    wpm,
  } = useTypingHandler();

  const testStarted = typedText.length !== 0;

  return (
    <motion.div
      className="relative whitespace-pre-wrap text-4xl leading-snug flex flex-col gap-2 mb-40 w-full"
      variants={containerVariants(animationOpacity, transitionDuration)}
      initial="hidden"
      animate="visible"
    >
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

      <TestProgress typedWords={typedWords} needWords={needWords} />
      <div ref={containerRef} className="relative overflow-hidden">
        <AnimatePresence
          key={`${testStarted}`}
          initial={false}
          mode={"popLayout"}
        >
          {wordsWithIndices.map(
            ({ word, typedWord, absoluteIndex, startIndex, maxLength }) => {
              const isTyping =
                typedWords.length - 1 === absoluteIndex &&
                typedWord.length > word.length;
              const animate = !isTyping && testStarted;

              return (
                <Word key={`word-${absoluteIndex}`} animate={animate}>
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
        <input
          autoFocus
          className="absolute opacity-0 top-0 left-0 size-full cursor-none"
        />
      </div>
    </motion.div>
  );
};

export default TypingText;
