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
  } = useTypingHandler();

  return (
    <motion.div
      className="relative whitespace-pre-wrap text-3xl leading-snug flex flex-col gap-2 mb-40 w-full"
      variants={containerVariants(animationOpacity, transitionDuration)}
      initial="hidden"
      animate="visible"
    >
      <Progress value={progressValue} />
      <div ref={containerRef} className="relative overflow-hidden">
        <AnimatePresence key={presenceResetKey} initial={false} mode={"popLayout"}>
          {wordsWithIndices.map(
            ({ word, typedWord, absoluteIndex, startIndex, maxLength }) => {
              
              return (
                <Word key={`word-${absoluteIndex}`}>
                  {renderLetters({ word, typedWord, startIndex, maxLength, typedText, absoluteIndex, typedWords })}
                </Word>
              );
            }
          )}
        </AnimatePresence>
        <Caret ref={caretRef} />
      </div>
    </motion.div>
  );
};

export default TypingText;
