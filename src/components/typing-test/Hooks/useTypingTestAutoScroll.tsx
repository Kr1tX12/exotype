import { RefObject, useEffect } from "react";
import { useStore } from "@/store/store";

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

  const getLineHeight = (container: HTMLElement) => {
    const computedStyle = window.getComputedStyle(container);
    const lineHeight = parseFloat(computedStyle.lineHeight);
    return isNaN(lineHeight)
      ? parseFloat(computedStyle.fontSize) * 1.2
      : lineHeight;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const lineHeight = getLineHeight(container);
    container.style.height = `${lineHeight * 3}px`; // Устанавливаем высоту на 3 строки
  }, [containerRef]);

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
      Math.min(target.offsetTop - lineHeight, container.scrollHeight - container.clientHeight)
    );

    // Если прокрутка уже в нужном положении, не вызываем onScroll
    if (Math.abs(container.scrollTop - newScrollTop) < lineHeight) return;

    onScroll();
  }, [typedWords, containerRef, prevLettersLength, onScroll, typedText]);
};
