"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Caret } from "./Caret/caret";
import { useTypingHandler } from "./Hooks/useTypingHandler";
import { Word } from "./Word/word";
import { Progress } from "../ui/progress";
import Letter from "./Letter/letter";
import { start } from "repl";

export const TypingText = () => {
  const {
    needWords,
    progressValue,
    caretRef,
    containerRef,
    typedWords,
    isTestReloading,
  } = useTypingHandler();

  const [displayedWords, setDisplayedWords] = useState(needWords);
  const [isContentReady, setIsContentReady] = useState(false);
  const [progressResetKey, setProgressResetKey] = useState(0);

  const transitionDuration = 0.15;

  // При монтировании, если есть слова – запускаем fade‑in
  useEffect(() => {
    if (needWords.length > 0) {
      setIsContentReady(true);
    }
  }, []);

  // Эффект срабатывает при изменении needWords или при флаге перезагрузки теста.
  useEffect(() => {
    // Сначала запускаем анимацию исчезновения (fade‑out)

    let timer: NodeJS.Timeout;

    if (isTestReloading) {
      setIsContentReady(false);
      timer = setTimeout(() => {
        if (JSON.stringify(needWords) === JSON.stringify(displayedWords)) {
          return;
        }
        setDisplayedWords(needWords);
        setIsContentReady(true);
      }, transitionDuration * 1000);
    } else {
      setDisplayedWords(needWords);
      setIsContentReady(true);
    }

    return () => clearTimeout(timer);
  }, [isTestReloading, needWords]);

  // Анимация контролируется флагом isContentReady:
  // если true → opacity: 1, иначе (false) → opacity: 0.
  const animationOpacity = isContentReady ? 1 : 0;

  // Глобальный счётчик для выставления data-index у всех символов.
  let globalIndexCounter = 0;

  const endWordsIndex = Math.min(typedWords.length + 25, needWords.length);

  return (
    <motion.div
      className="relative whitespace-pre-wrap text-3xl leading-snug flex flex-col gap-2 mb-40 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: animationOpacity }}
      transition={{ opacity: { duration: transitionDuration } }}
    >
      {/* Пересоздаём Progress при перезагрузке */}
      <Progress key={progressResetKey} value={progressValue} />

      <div ref={containerRef} className="relative overflow-hidden">
        {displayedWords.slice(0, endWordsIndex).map((word, wordIndex) => {
          const typedWord = typedWords[wordIndex] ?? "";
          // Собираем массив символов: сначала оригинальные, потом лишние (если ввели больше)
          const wordArray = Array.from(word).concat(
            Array.from(typedWord.substring(word.length))
          );

          const startIndex = globalIndexCounter;
          globalIndexCounter += wordArray.length + 1;

          return (
            <React.Fragment key={wordIndex}>
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
