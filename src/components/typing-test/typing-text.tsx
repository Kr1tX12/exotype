"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Caret } from "./Caret/caret";
import { Word } from "./Word/word";
import { Progress } from "../ui/progress";
import Letter from "./Letter/letter";
import { useTypingHandler } from "./Hooks/useTypingHandler";

export const TypingText = () => {
  const {
    needWords,
    progressValue,
    caretRef,
    containerRef,
    typedWords,
    animationOpacity,
    transitionDuration,
    displayedWords,
    startWordsIndex,
    endWordsIndex,
  } = useTypingHandler();

  // Глобальный счётчик для выставления data-index у всех символов.

  const initialGlobalIndex = useMemo(() => {
    return needWords.slice(0, startWordsIndex).reduce((total, word, index) => {
      const typedWord = typedWords[index] ?? "";
      console.log({ typedWord, word });

      total += Math.max(typedWord.length, word.length) + 1;
      return total;
    }, 0);
  }, [needWords, startWordsIndex]);

  let globalIndexCounter = initialGlobalIndex;

  return (
    <motion.div
      className="relative whitespace-pre-wrap text-3xl leading-snug flex flex-col gap-2 mb-40 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: animationOpacity }}
      transition={{ opacity: { duration: transitionDuration } }}
    >
      <Progress value={progressValue} />

      <div ref={containerRef} className="relative overflow-hidden">
        {displayedWords
          .slice(startWordsIndex, endWordsIndex + 1)
          .map((word, relativeIndex) => {
            const absoluteIndex = startWordsIndex + relativeIndex;
            const typedWord = typedWords[absoluteIndex] ?? "";

            const wordArray = Array.from(word).concat(
              Array.from(typedWord.substring(word.length))
            );

            const startIndex = globalIndexCounter;
            globalIndexCounter += wordArray.length + 1;

            return (
              <React.Fragment key={relativeIndex}>
                <Word
                  underlined={
                    typedWord
                      ? typedWord !== word && typedWord.length >= word.length
                      : false
                  }
                >
                  {wordArray.map((letter, letterIndex) => {
                    const isWrong = typedWord[letterIndex]
                      ? typedWord[letterIndex] !== letter ||
                        letterIndex > word.length - 1
                      : false;
                    const isExtra = letterIndex > word.length - 1;
                    const isWritten = Boolean(typedWord[letterIndex]);
                    return (
                      <Letter
                        key={letterIndex}
                        letter={letter}
                        isWrong={isWrong}
                        isWritten={isWritten}
                        globalIndex={startIndex + letterIndex}
                        isExtra={isExtra}
                      />
                    );
                  })}
                </Word>
                <Letter
                  letter=" "
                  isWrong={false}
                  isWritten={false}
                  isExtra={false}
                  globalIndex={globalIndexCounter - 1}
                />
              </React.Fragment>
            );
          })}
        <Caret ref={caretRef} />
      </div>
    </motion.div>
  );
};

export default TypingText;
