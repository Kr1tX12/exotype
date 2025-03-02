"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Caret } from "./components/caret";
import { Word } from "./components/word";
import { Progress } from "../ui/progress";
import { useTypingHandler } from "./hooks/useTypingHandler";
import { renderLetters } from "./utils/renderLetters";

const containerVariants = (opacity: number, duration: number) => ({
  hidden: { opacity: 0 },
  visible: { opacity, transition: { duration } },
});

// Основной компонент для практики печати (❁´◡`❁)
// типо тут текст и его нужно писать ☜(ﾟヮﾟ☜)

export const TypingText = () => {
  const {
    progressValue,
    caretRef,
    containerRef,
    typedWords,
    typedText,
    animationOpacity,
    transitionDuration,
    wordsWithIndices,
    presenceResetKey,
    wpm,
  } = useTypingHandler();

  return (
    <motion.div
      className="relative whitespace-pre-wrap text-3xl leading-snug flex flex-col gap-2 mb-40 w-full"
      variants={containerVariants(animationOpacity, transitionDuration)}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        animate={{ opacity: typedText.length > 0 ? 1 : 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex gap-4 mx-auto"
      >
        <div className="flex flex-col items-center leading-none">
          <p className="text-3xl font-medium">{wpm}</p>
          <p className="text-xs font-normal text-muted-foreground">WPM</p>
        </div>
      </motion.div>
      <Progress value={progressValue} />
      <div ref={containerRef} className="relative overflow-hidden">
        <AnimatePresence
          key={presenceResetKey}
          initial={false}
          mode={"popLayout"}
        >
          {wordsWithIndices.map(
            ({ word, typedWord, absoluteIndex, startIndex, maxLength }) => {
              return (
                <Word key={`word-${absoluteIndex}`}>
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
