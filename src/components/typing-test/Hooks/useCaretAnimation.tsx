import { RefObject, useLayoutEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { useStore } from "@/store/store";
import { useDebounce } from "@/hooks/useDebounce";

export const useCaretAnimation = ({
  containerRef,
  caretRef,
  prevLettersLength,
  typedWords,
  startWordsIndex,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
  caretRef: RefObject<HTMLDivElement | null>;
  prevLettersLength: number;
  typedWords: string[];
  startWordsIndex: number;
}) => {
  const typedText = useStore((state) => state.typedText);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const updateCaretPosition = useCallback(() => {
    const container = containerRef.current;
    const caret = caretRef.current;
    if (!container || !caret) return;

    // Повторно используем существующую логику позиционирования
    if (typedWords.length === 1 && typedWords[0] === "") {
      gsap.to(caret, { x: 0, y: 0, duration: 0.1, ease: "power1.out" });
      return;
    }

    const lastIndex = Math.max(
      0,
      prevLettersLength + (typedWords[typedWords.length - 1]?.length || 0) - 1
    );

    const target = container.querySelector(
      `[data-index="${lastIndex}"]`
    ) as HTMLElement;

    if (!target) return;

    // Новая логика для обработки переноса строк
    const nextElem = container.querySelector(
      `[data-index="${lastIndex + 1}"]`
    ) as HTMLElement;

    const isNewLine = nextElem && nextElem.offsetTop > target.offsetTop;
    const isEndOfLine =
      target.offsetLeft + target.offsetWidth > container.offsetWidth;

    let caretX = target.offsetLeft + target.offsetWidth;
    let caretY = target.offsetTop;

    if (isNewLine || isEndOfLine) {
      caretX = 0;
      caretY += target.offsetHeight;
    }

    gsap.to(caret, {
      x: caretX,
      y: caretY,
      duration: 0.1,
      ease: "power1.out",
    });
  }, [typedWords, prevLettersLength, containerRef, caretRef]);

  // Дебаунс ресайза
  const debouncedUpdate = useDebounce(updateCaretPosition, 100);

  useLayoutEffect(() => {
    // Обработчик изменений размера окна
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      debouncedUpdate();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [debouncedUpdate]);

  useLayoutEffect(() => {
    updateCaretPosition();
  }, [typedText, windowSize, updateCaretPosition]);
};
