"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { Caret } from "./Caret/caret";
import { useTypingHandler } from "./Hooks/useTypingHandler";
import { Word } from "./Word/word";
import { Progress } from "../ui/progress";
import Letter from "./Letter/letter";

export const TypingText = () => {
  const { text, words, progressValue, caretRef, containerRef } =
    useTypingHandler();

  // Выставляем высоту контейнера равной трем строкам
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const computedStyle = window.getComputedStyle(container);
    let lineHeightStr = computedStyle.lineHeight;
    let lineHeightPx = parseFloat(lineHeightStr);
    if (isNaN(lineHeightPx)) {
      const fontSize = parseFloat(computedStyle.fontSize);
      lineHeightPx = fontSize * 1.2;
    }
    // Высота = 3 строки
    container.style.height = `${lineHeightPx * 3}px`;
  }, [containerRef]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const computedStyle = window.getComputedStyle(container);
    let lineHeightStr = computedStyle.lineHeight;
    let lineHeight = parseFloat(lineHeightStr);
    if (isNaN(lineHeight)) {
      const fontSize = parseFloat(computedStyle.fontSize);
      lineHeight = fontSize * 1.2;
    }

    // Если текста нет, устанавливаем scrollTop в начало.
    if (text.length === 0) {
      gsap.to(container, { scrollTop: 0, duration: 0.2, ease: "power1.out" });
      return;
    }

    // Если последний символ - пробел, используем элемент следующего индекса,
    // чтобы перенос строки произошёл сразу после пробела.
    const index = text.endsWith(" ") ? text.length : text.length - 1;
    const target = container.querySelector(
      `[data-index="${index}"]`
    ) as HTMLElement;
    if (!target) return;

    // Рассчитываем scrollTop так, чтобы целевая строка оказывалась второй.
    const newScrollTop =
      target.offsetTop < lineHeight ? 0 : target.offsetTop - lineHeight;

    gsap.to(container, {
      scrollTop: newScrollTop,
      duration: 0.2,
      ease: "power1.out",
    });
  }, [text, containerRef]);

  // Глобальный счётчик для вычисления data-index всех символов
  let globalIndexCounter = 0;

  const typedWords = text.split(" ");
  console.log(typedWords);

  return (
    <div className="relative whitespace-pre-wrap text-3xl leading-snug flex flex-col gap-2">
      <Progress value={progressValue} />

      <div ref={containerRef} className="relative overflow-hidden">
        {words.map((word, wordIndex) => {
          const typedWord = typedWords[wordIndex] ?? "";
          const wordArray = Array.from(word).concat(Array.from(typedWord.substring(word.length, typedWord.length)));
          
          const startIndex = globalIndexCounter;
          globalIndexCounter += wordArray.length;
          return (
            <Word key={wordIndex}>
              {wordArray.map((letter, letterIndex) => {
                const isWrong = typedWord[letterIndex] ? typedWord[letterIndex] !== letter : false;
                const isWritten = Boolean(typedWord[letterIndex]);

                
                return (
                  <Letter
                    key={letterIndex}
                    letter={letter}
                    isWrong={isWrong}
                    isWritten={isWritten}
                    globalIndex={startIndex + letterIndex}
                  />
                );
              })}
            </Word>
          );
        })}
        <Caret ref={caretRef} />
      </div>
    </div>
  );
};

export default TypingText;
