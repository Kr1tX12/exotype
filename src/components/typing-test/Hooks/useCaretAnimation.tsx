import { useLayoutEffect, useCallback, useRef, useEffect } from "react";
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
  const needText = useStore((state) => state.needText);
  // Сохраняем предыдущую позицию по оси Y для определения переноса строки
  const lastCaretYRef = useRef(0);

  const updateCaretPosition = useCallback(() => {
    const container = containerRef.current;
    const caret = caretRef.current;
    if (!container || !caret) return;

    // Если ещё ничего не введено – ставим каретку в начало
    if (typedWords.length === 1 && typedWords[0] === "") {
      gsap.to(caret, { x: 0, y: 0, duration: 0.1, ease: "power1.out" });
      lastCaretYRef.current = 0;
      return;
    }

    const lastIndex = Math.max(
      0,
      prevLettersLength + (typedWords[typedWords.length - 1]?.length || 0) - 1
    );

    const targetLetter = container.querySelector(
      `[data-index="${lastIndex}"]`
    ) as HTMLElement;
    if (!targetLetter) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = targetLetter.getBoundingClientRect();

    // Расчёт новой позиции каретки: x – конец целевой буквы, y – верхняя граница буквы относительно контейнера
    const newX = Math.round(
      targetRect.left - containerRect.left + targetRect.width
    );
    const newY = Math.round(targetRect.top - containerRect.top);

    // Если новая позиция по Y значительно больше предыдущей, значит, произошёл перенос строки
    const threshold = 2; // порог в пикселях
    const isNewLine = newY > lastCaretYRef.current + threshold;
    // Устанавливаем длительность анимации: немного дольше при переносе строки
    const duration = isNewLine ? 0.15 : 0.1;

    gsap.to(caret, { x: newX, y: newY, duration, ease: "power1.out" });
    lastCaretYRef.current = newY;
  }, [containerRef, caretRef, prevLettersLength, typedWords, typedText]);

  // Обновляем позицию каретки после обновления DOM
  useLayoutEffect(() => {
    updateCaretPosition();
  }, [typedText, updateCaretPosition]);

  // Обновляем позицию при изменении размеров окна
  useLayoutEffect(() => {
    const handleResize = () => updateCaretPosition();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateCaretPosition]);

  useEffect(() => {
    lastCaretYRef.current = 0;
  }, [needText]);
};
