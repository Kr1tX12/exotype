import { RefObject, useEffect, useState } from "react";
import { useStore } from "@/store/store";

// ТУТ РАНЬШЕ БЫЛА АНИМАЦИЯ НО Я ЕЁ УБРАЛ ЧТОБЫ НЕ ЛАГАЛО!!! ТЕПЕРЬ ОНА ПРОСТО ВЫЗЫВАЕТ ONSCROLL КОГДА НУЖНО
export const useTypingTestAutoScroll = ({
  containerRef,
  typedWords,
  prevLettersLength,
  onScroll,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
  typedWords: string[];
  prevLettersLength: number;
  onScroll: () => void;
}) => {
  const typedText = useStore((state) => state.typedText);

  // ВЫСОТА ТЕКСТА 3 СТРОЧКИ ИИИИИ????
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
    // 3 СТРОКИ ДАА ДАД АДА А ДАДАДД АДА
    container.style.height = `${lineHeightPx * 3}px`;
  }, [containerRef]);

  //ЧТО ДЕЛАЕМ КОГДА МЕНЯЕТСЯ ТЕЕЕКСТ!!
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

    // ПОЛУЧАЕМ ЭЛЕМЕНТ!!! ПОСЛЕДНЕГО СИМВОЛА!!!!
    const index = typedText.endsWith(" ")
      ? prevLettersLength + typedWords[typedWords.length - 1].length
      : prevLettersLength + typedWords[typedWords.length - 1].length - 1;

    const target = container.querySelector(
      `[data-index="${index}"]`
    ) as HTMLElement;
    if (!target) return;

    let newScrollTop =
      target.offsetTop < lineHeight ? 0 : target.offsetTop - lineHeight;

    const maxScrollTop = container.scrollHeight - container.clientHeight;

    if (newScrollTop > maxScrollTop) {
      newScrollTop = maxScrollTop;
    }

    if (Math.abs(container.scrollTop - newScrollTop) < lineHeight) return;

    onScroll();
  }, [typedWords, containerRef]);
};

// КОНЕЦ!!!!!!!!!!!!!!!!!
