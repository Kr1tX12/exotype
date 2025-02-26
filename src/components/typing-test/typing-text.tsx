"use client";

import React, { useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Caret } from "./Caret/caret";
import { Word } from "./Word/word";
import { Progress } from "../ui/progress";
import { Letter } from "./Letter/letter";
import { useTypingHandler } from "./Hooks/useTypingHandler";

const containerVariants = (opacity: number, duration: number) => ({
  hidden: { opacity: 0 },
  visible: { opacity, transition: { duration } },
});

export const TypingText = () => {
  const {
    needWords,
    progressValue,
    caretRef,
    containerRef,
    typedWords,
    typedText,
    animationOpacity,
    transitionDuration,
    displayedWords,
    startWordsIndex,
    endWordsIndex,
  } = useTypingHandler();
  // Оптимизированное вычисление initialGlobalIndex с инкрементацией
  const initialGlobalIndexRef = useRef(0);
  const prevStartIndexRef = useRef(startWordsIndex);

  if (startWordsIndex !== prevStartIndexRef.current) {
    if (startWordsIndex > prevStartIndexRef.current) {
      // Добавляем вклад для новых слов от предыдущего индекса до нового startWordsIndex
      for (let i = prevStartIndexRef.current; i < startWordsIndex; i++) {
        const typedWord = typedWords[i] ?? "";
        const word = needWords[i];
        initialGlobalIndexRef.current +=
          Math.max(word.length, typedWord.length) + 1; // +1 для пробела
      }
    } else {
      // Если индекс уменьшился, пересчитываем полностью
      let total = 0;
      for (let i = 0; i < startWordsIndex; i++) {
        const typedWord = typedWords[i] ?? "";
        const word = needWords[i];
        total += Math.max(word.length, typedWord.length) + 1;
      }
      initialGlobalIndexRef.current = total;
    }
    prevStartIndexRef.current = startWordsIndex;
  }
  const initialGlobalIndex = initialGlobalIndexRef.current;

  // Остальная логика остается прежней, используем вычисленный initialGlobalIndex
  const wordsWithIndices = useMemo(() => {
    let currentGlobalIndex = initialGlobalIndex;
    return displayedWords
      .slice(startWordsIndex, endWordsIndex + 1)
      .map((word, relativeIndex) => {
        const absoluteIndex = startWordsIndex + relativeIndex;
        const typedWord = typedWords[absoluteIndex] ?? "";
        const maxLength = Math.max(word.length, typedWord.length);
        const startIndex = currentGlobalIndex;
        currentGlobalIndex += maxLength + 1; // +1 для пробела
        return { word, typedWord, absoluteIndex, startIndex, maxLength };
      });
  }, [
    displayedWords,
    startWordsIndex,
    endWordsIndex,
    typedWords,
    initialGlobalIndex,
  ]);

  useEffect(() => {
    initialGlobalIndexRef.current = 0;
    prevStartIndexRef.current = 0;
  }, [displayedWords]);

  const renderLetters = useCallback(
    ({
      word,
      typedWord,
      startIndex,
      maxLength,
    }: {
      word: string;
      typedWord: string;
      startIndex: number;
      maxLength: number;
    }) => {
      const letters = [];
      for (let i = 0; i < maxLength; i++) {
        const letter = i < word.length ? word[i] : typedWord[i] || "";
        const isWritten = i < typedWord.length;
        const isExtra = i >= word.length;
        const isWrong = isWritten && (letter !== typedWord[i] || isExtra);
        letters.push(
          <Letter
            key={`${startIndex}-${i}`}
            letter={letter}
            isWrong={isWrong}
            isWritten={isWritten}
            isExtra={isExtra}
            globalIndex={startIndex + i}
          />
        );

      }
      letters.push(
        <Letter
          key={startIndex + maxLength}
          letter=" "
          isWrong={false}
          isWritten={false}
          isExtra={false}
          globalIndex={startIndex + maxLength}
        />
      );
      return letters;
    },
    []
  );

  return (
    <motion.div
      className="relative whitespace-pre-wrap text-3xl leading-snug flex flex-col gap-2 mb-40 w-full"
      variants={containerVariants(animationOpacity, transitionDuration)}
      initial="hidden"
      animate="visible"
    >
      <Progress value={progressValue} />
      <div ref={containerRef} className="relative overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {wordsWithIndices.map(
            ({ word, typedWord, absoluteIndex, startIndex, maxLength }) => {
              const underlined = Boolean(
                typedWord &&
                  typedWord !== word.slice(0, typedWord.length) &&
                  (typedWords[absoluteIndex + 1] ||
                    typedText[typedText.length - 1] === " ")
              );
              const isWriting =
                absoluteIndex === typedWords.length - 1 &&
                typedWord.length > word.length;

              return (
                <span key={`${word}-${absoluteIndex}`}>
                  <Word underlined={underlined} isWriting={isWriting}>
                    {renderLetters({ word, typedWord, startIndex, maxLength })}
                  </Word>
                </span>
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
