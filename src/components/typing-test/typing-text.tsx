"use client";
  import React, { useEffect } from "react";
  import gsap from "gsap";
  import { Caret } from "./Caret/caret";
  import { useTypingHandler } from "./Hooks/useTypingHandler";
  import { Word } from "./Word/word";
  import { Progress } from "../ui/progress";
  
  /*
    Компонент TypingText:
    - Отображает текст, разбитый на части (например, символы/слова) таким образом, чтобы весь исходный текст уже отрендерен.
    - Высота контейнера задается равной трем строкам (для видимости введенных строк и превью следующей).
    - При достижении конца строки (когда пользователь нажимает пробел после последнего слова строки) теперь НЕ вставляется перенос строки, а просто добавляется пробел.
    - Позиционирование каретки происходит по последнему введенному символу.
    - Прокрутка контейнера корректируется с помощью gsap, чтобы всегда оставались видимыми последние три строки.
  */
  export const TypingText = () => {
    const { text, words, progressValue, caretRef, containerRef } = useTypingHandler();
  
    // Глобальный счётчик для вычисления data-index всех символов
    let globalIndexCounter = 0;
  
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
  
    // Прокрутка контейнера так, чтобы каретка всегда была видна
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      if (text.length === 0) {
        gsap.to(container, { scrollTop: 0, duration: 0.2, ease: "power1.out" });
        return;
      }
      const target = container.querySelector(`[data-index="${text.length - 1}"]`) as HTMLElement;
      if (!target) return;
      const currentScroll = container.scrollTop;
      const containerHeight = container.clientHeight;
      const targetTop = target.offsetTop;
      const targetBottom = targetTop + target.offsetHeight;
      if (targetBottom > currentScroll + containerHeight) {
        gsap.to(container, {
          scrollTop: targetBottom - containerHeight,
          duration: 0.2,
          ease: "power1.out",
        });
      } else if (targetTop < currentScroll) {
        gsap.to(container, {
          scrollTop: targetTop,
          duration: 0.2,
          ease: "power1.out",
        });
      }
    }, [text, containerRef]);
  
    return (
      <div className="relative whitespace-pre-wrap text-3xl leading-snug flex flex-col gap-2">
        <Progress value={progressValue} />
        {/* Ограничиваем высоту до трех строк и скрываем переполнение */}
        <div ref={containerRef} className="relative overflow-hidden">
          {words.map((word, i) => {
            const startIndex = globalIndexCounter;
            globalIndexCounter += word.length;
            return (
              // Word рендерит свои символы с data-index, сравнивая globalStart + индекс внутри слова с введённым текстом
              <Word key={i} word={word} globalStart={startIndex} text={text} />
            );
          })}
          <Caret ref={caretRef} />
        </div>
      </div>
    );
  };
  
  export default TypingText;