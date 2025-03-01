import { useLayoutEffect, useCallback, useRef } from "react";
import gsap from "gsap";
import { useStore } from "@/store/store";

export const useCaretAnimation = ({
  containerRef,
  caretRef,
  prevLettersLength,
  typedWords,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  caretRef: React.RefObject<HTMLDivElement | null>;
  prevLettersLength: number;
  typedWords: string[];
}) => {
  const typedText = useStore((state) => state.typedText);
  const lastCaretPosition = useRef({ x: 0, y: 0 });
  const lastLetterRef = useRef<HTMLElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const getLetterByIndex = useCallback(
    (index: number) => {
      return containerRef.current?.querySelector(
        `[data-index="${index}"]`
      ) as HTMLElement | null;
    },
    [containerRef]
  );

  const getLastLetter = useCallback((addIndex: number = 0) => {
    const lastIndex = Math.max(
      0,
      prevLettersLength + (typedWords[typedWords.length - 1]?.length || 0) - 1 + addIndex
    );

    if (lastLetterRef.current?.dataset.index === `${lastIndex}`) {
      return lastLetterRef.current;
    }

    const targetLetter = getLetterByIndex(lastIndex);
    lastLetterRef.current = targetLetter || null;
    return targetLetter;
  }, [prevLettersLength, typedWords, getLetterByIndex]);

  const animateCaret = useCallback(() => {
    const container = containerRef.current;
    const caret = caretRef.current;
    if (!container || !caret) return;

    if (typedText === "") {
      gsap.to(caret, { x: 0, y: 0, duration: 0.1, ease: "power1.out" });
      return;
    }

    let targetLetter = getLastLetter();
    let isNextLetter = false;
    if (!targetLetter) {
      targetLetter = getLastLetter(1)
      isNextLetter = true;
    } 

    if (!targetLetter) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = targetLetter.getBoundingClientRect();

    // Начальное вычисление: позиция = конец targetLetter
    let newX = Math.round(
      targetRect.left - containerRect.left + (isNextLetter ? 0 : targetRect.width)
    );
    let newY = Math.round(targetRect.top - containerRect.top);

    // ЕСЛИ буква, которую мега печататель пишет - пробел
    // ПЕРЕНОСИМ СТРОКУ. ЧТОБЫ НОРМАЛЬНО ВЫГЛЯДЕЛО.
    if ((targetLetter.textContent || "").trim() === "") {
      const currentIndex = Number(targetLetter.dataset.index);
      const nextLetter = getLetterByIndex(currentIndex + 1);
      if (nextLetter) {
        const nextRect = nextLetter.getBoundingClientRect();
        if (nextRect.top > targetRect.top) {
          // Переносим на следующую букву. ПОТОМУ ЧТО Я ТАК ЗАХОТЕЛ
          newX = Math.round(nextRect.left - containerRect.left);
          newY = Math.round(nextRect.top - containerRect.top);
        }
      }
    }

    if (
      newX !== lastCaretPosition.current.x ||
      newY !== lastCaretPosition.current.y
    ) {
      gsap.to(caret, { x: newX, y: newY, duration: 0.1, ease: "power1.out" });
      lastCaretPosition.current = { x: newX, y: newY };
    }

    animationFrameRef.current = requestAnimationFrame(animateCaret);
  }, [containerRef, caretRef, getLastLetter, getLetterByIndex, typedText]);

  useLayoutEffect(() => {
    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(animateCaret);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [typedText, animateCaret]);

  useLayoutEffect(() => {
    const handleResize = () => animateCaret();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [animateCaret]);
};
