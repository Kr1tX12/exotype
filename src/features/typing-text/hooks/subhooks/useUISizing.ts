import { RefObject, useCallback, useEffect } from "react";

// Для динамического изменения размера текста и контейнера.
export const useUISizing = ({
  containerRef,
  caretRef,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
  caretRef: RefObject<HTMLDivElement | null>;
}) => {
  const getLineHeight = useCallback((element: HTMLElement): number => {
    const computedStyle = window.getComputedStyle(element);
    const lineHeight = parseFloat(computedStyle.lineHeight);
    return isNaN(lineHeight)
      ? parseFloat(computedStyle.fontSize) * 1.2
      : lineHeight;
  }, []);

  const updateSizes = useCallback(() => {
    const container = containerRef.current;
    const caret = caretRef.current;
    if (!container || !caret) return;
    const lineHeight = getLineHeight(container);
    container.style.height = `${lineHeight * 3}px`; // 3 строки
    caret.style.height = `${lineHeight * 0.8}px`; // Немного меньше высоты курсора
    caret.style.marginTop = `${lineHeight * 0.15}px`; // Сдвиг для центрирования
  }, [containerRef, caretRef, getLineHeight]);

  useEffect(() => {
    updateSizes();
  }, [updateSizes]);

  useEffect(() => {
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, [updateSizes]);

  return { getLineHeight };
};
