import React from "react";
import { splitText } from "@/lib/utils";
import { Caret } from "./Caret/caret";
import { useTypingHandler } from "./Hooks/useTypingHandler";
import { Word } from "./Word/word";
import { Progress } from "../ui/progress";

/**
 * Компонент TypingText отображает текст для печати с анимацией печатания.
 * Новый функционал: ограничение отображения текста первыми x строками.
 *
 * Реализация основана на использовании CSS-свойств, таких как -webkit-line-clamp.
 * Чтобы работало корректно, контейнер с текстом должен иметь:
 *   - display: -webkit-box;
 *   - -webkit-box-orient: vertical;
 *   - overflow: hidden;
 *
 * Если используете плагин Tailwind CSS line-clamp, можно добавить класс, например "line-clamp-3".
 */
export const TypingText = () => {
  const { text, needText, words, progressValue, caretRef, containerRef } = useTypingHandler();
  const linesLimit = 3; // Задайте необходимое число строк

  // Глобальный счётчик для вычисления смещения символов
  let globalIndexCounter = 0;

  return (
    <div
      ref={containerRef}
      className="relative whitespace-pre-wrap text-3xl leading-snug flex flex-col gap-2"
    >
      <Progress value={progressValue} />
      {/* Ограничиваем вывод текста с помощью inline-стилей */}
      <div
        className="max-h-96 overflow-hidden"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: linesLimit,
          WebkitBoxOrient: "vertical",
        }}
      >
        {words.map((word, i) => {
          const startIndex = globalIndexCounter;
          globalIndexCounter += word.length;
          return (
            // Используем span, чтобы слова вели себя как inline-элементы и браузер мог их правильно переносить.
            <Word key={i} word={word} globalStart={startIndex} text={text} />
          );
        })}
        <Caret ref={caretRef} />
      </div>
    </div>
  );
};

export default TypingText;