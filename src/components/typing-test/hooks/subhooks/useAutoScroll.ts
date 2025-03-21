import { RefObject, useEffect } from "react";

interface AutoScrollProps {
  containerRef: RefObject<HTMLDivElement | null>;
  typedText: string;
  typedWords: string[];
  completedWordsLength: number;
  getLineHeight: (element: HTMLElement) => number;
  onScroll: () => void;
}

export const useAutoScroll = ({
  containerRef,
  typedText,
  typedWords,
  completedWordsLength,
  getLineHeight,
  onScroll,
}: AutoScrollProps) => {
  useEffect(() => {
    if (typedText.at(-1) !== " ") return;

    const container = containerRef.current;
    if (!container) return;
    const lineHeight = getLineHeight(container);
    const lastWord = typedWords[typedWords.length - 1];
    const targetIndex = typedText.endsWith(" ")
      ? completedWordsLength + lastWord.length
      : completedWordsLength + lastWord.length - 1;

    const targetEl = container.querySelector(
      `[data-index="${targetIndex}"]`
    ) as HTMLElement;
    if (!targetEl) return;

    const newScrollTop = Math.max(
      0,
      Math.min(
        targetEl.offsetTop - lineHeight,
        container.scrollHeight - container.clientHeight
      )
    );

    if (Math.abs(container.scrollTop - newScrollTop) < lineHeight) return;
    onScroll();
  }, [
    typedText,
    typedWords,
    completedWordsLength,
    containerRef,
    getLineHeight,
    onScroll,
  ]);
};
