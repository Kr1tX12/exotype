import { RefObject, useLayoutEffect, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { useStore } from "@/store/store";
import { useDebounce } from "@/hooks/useDebounce";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

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
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
  }, []);

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

  useIsomorphicLayoutEffect(() => {
    // Обработчик изменений размера окна
    if (typeof window === "undefined") return;

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

  useIsomorphicLayoutEffect(() => {
    updateCaretPosition();
  }, [typedText, windowSize, updateCaretPosition]);
};
