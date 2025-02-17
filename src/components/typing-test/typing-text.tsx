"use client";
import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  const [previousWords, setPreviousWords] = useState<string[]>([]);
  const leavingWordsRef = useRef<Set<string>>(new Set());
  const animationTimeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    const newLeaving = new Set(
      previousWords.filter((word) => !displayedWords.includes(word))
    );

    if (newLeaving.size > 0) {
      leavingWordsRef.current = newLeaving;
      animationTimeoutRef.current = setTimeout(() => {
        leavingWordsRef.current.clear();
      }, 200);
    }

    setPreviousWords(displayedWords);
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [displayedWords]);

  const initialGlobalIndex = useMemo(() => {
    return needWords.slice(0, startWordsIndex).reduce((total, word, index) => {
      const typedWord = typedWords[index] ?? "";
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
        <AnimatePresence initial={false} mode="popLayout">
          {displayedWords
            .slice(startWordsIndex, endWordsIndex + 1)
            .map((word, relativeIndex) => {
              const absoluteIndex = startWordsIndex + relativeIndex;
              const typedWord = typedWords[absoluteIndex] ?? "";
              const isLeaving = leavingWordsRef.current.has(word);

              const wordArray = Array.from(word).concat(
                Array.from(typedWord.substring(word.length))
              );

              const startIndex = globalIndexCounter;
              globalIndexCounter += wordArray.length + 1;

              return (
                <motion.span
                  key={`${word}-${absoluteIndex}`}
                  layout="position"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ display: "inline-block" }}
                >
                  <Word
                    underlined={Boolean(
                      typedWord &&
                        typedWord !== word &&
                        typedWord.length >= word.length
                    )}
                    isLeaving={isLeaving}
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
                          key={`${startIndex}-${letterIndex}`}
                          letter={letter}
                          isWrong={isWrong}
                          isWritten={isWritten}
                          globalIndex={startIndex + letterIndex}
                          isExtra={isExtra}
                        />
                      );
                    })}
                    <Letter
                      letter=" "
                      isWrong={false}
                      isWritten={false}
                      isExtra={false}
                      globalIndex={globalIndexCounter - 1}
                    />
                  </Word>
                </motion.span>
              );
            })}
        </AnimatePresence>
        <Caret ref={caretRef} />
      </div>
    </motion.div>
  );
};

export default TypingText;
