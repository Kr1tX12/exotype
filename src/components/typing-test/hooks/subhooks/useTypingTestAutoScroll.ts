import { RefObject, useCallback, useEffect } from "react";
import { useStore } from "@/store/store";

// Эта хуйня нужна для:
// Выявления момента, в котором возможен перенос строки
// УСТАНОВКА ВЫСОТЫ ДЛЯ КУРСОРА С ДЕБАУНСОМ
// УСТАНОВКА ВЫСОТЯ КОНТЕЙНЕРА С ДЕБАУНСОМ
export const useTypingTestAutoScroll = ({
  containerRef,
  caretRef,
  typedWords,
  prevLettersLength,
  onScroll,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
  caretRef: RefObject<HTMLDivElement | null>;
  typedWords: string[];
  prevLettersLength: number;
  onScroll: () => void;
}) => {
  const typedText = useStore((state) => state.typedText);

  const getLineHeight = useCallback((container: HTMLElement) => {
    const computedStyle = window.getComputedStyle(container);
    const lineHeight = parseFloat(computedStyle.lineHeight);
    return isNaN(lineHeight)
      ? parseFloat(computedStyle.fontSize) * 1.2
      : lineHeight;
  }, []);

  const updateHeights = useCallback(() => {
    const container = containerRef.current;
    const caret = caretRef.current;
    if (!container || !caret) return;

    const lineHeight = getLineHeight(container);
    container.style.height = `${lineHeight * 3}px`;
    caret.style.height = `${lineHeight * 0.8}px`;
    caret.style.marginTop = `${lineHeight * 0.15}px`
  }, [containerRef, caretRef, getLineHeight]);

  useEffect(() => {
    updateHeights();
  }, [updateHeights]);

  useEffect(() => {
    window.addEventListener("resize", updateHeights);
    return () => {
      window.removeEventListener("resize", updateHeights);
    };
  }, [updateHeights]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lineHeight = getLineHeight(container);

    // Рассчитываем индекс последнего символа
    const index = typedText.endsWith(" ")
      ? prevLettersLength + typedWords[typedWords.length - 1].length
      : prevLettersLength + typedWords[typedWords.length - 1].length - 1;

    const target = container.querySelector(
      `[data-index="${index}"]`
    ) as HTMLElement;
    if (!target) return;

    const newScrollTop = Math.max(
      0,
      Math.min(
        target.offsetTop - lineHeight,
        container.scrollHeight - container.clientHeight
      )
    );

    // Если прокрутка уже в нужном положении, не вызываем onScroll
    if (Math.abs(container.scrollTop - newScrollTop) < lineHeight) return;

    onScroll();
  }, [
    typedWords,
    containerRef,
    prevLettersLength,
    onScroll,
    typedText,
    getLineHeight,
  ]);

  return { getLineHeight };
};
