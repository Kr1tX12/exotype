import { splitText } from "@/lib/utils";
import React from "react";
import { Caret } from "./Caret/caret";
import { useTypingHandler } from "./Hooks/useTypingHandler";
import { Word } from "./Word/word";

export const TypingText = () => {
  const { text, needText, caretRef, containerRef } = useTypingHandler();

  const words = splitText(needText);

  // При рендере вычисляем глобальный индекс для каждой буквы.
  // Это нужно, чтобы внутри компонента Word можно было присвоить каждому символу data-атрибут.
  let globalIndexCounter = 0;

  return (
    <div
      ref={containerRef}
      className="overflow-hidden relative whitespace-pre-wrap"
    >
      {words.map((word, i) => {
        const startIndex = globalIndexCounter;
        globalIndexCounter += word.length;
        return (
          // Используем span, чтобы слова вели себя как inline-элементы и браузер мог их правильно переносить
          <Word key={i} word={word} globalStart={startIndex} text={text} />
        );
      })}
      <Caret ref={caretRef} />
    </div>
  );
};
