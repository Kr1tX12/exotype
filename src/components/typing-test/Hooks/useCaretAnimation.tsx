import { RefObject, useEffect } from "react";
import gsap from "gsap";
import { useStore } from "@/store/store";
export const useCaretAnimation = ({
  containerRef,
  caretRef,
  prevWordsLength,
  typedWords,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
  caretRef: RefObject<HTMLDivElement | null>;
  prevWordsLength: number;
  typedWords: string[];
}) => {
  // -------------------
  // ЭТА ХЕРНЯ ДВИГАЕТ КАРЕТКУ НЕ ТРОГАТЬ!!!!!! РАБОТАЕТ !!!!!
  // -------------------

  const typedText = useStore((state) => state.typedText);

  useEffect(() => {
    const container = containerRef.current;
    const caret = caretRef.current;
    if (!container || !caret) return;

    // Текста нет! Ставим в НАЧАЛО!!!!
    if (typedWords.length === 1 && typedWords[0] === "") {
      gsap.to(caret, { x: 0, y: 0, duration: 0.1, ease: "power1.out" });
      return;
    }

    // ПОЛУЧАЕМ ЭЛЕМЕНТ!!! ПОСЛЕДНЕГО СИМВОЛА!!!!
    const lastIndex =
      prevWordsLength + typedWords[typedWords.length - 1].length - 1;

    console.log(lastIndex);
    let target = container.querySelector(
      `[data-index="${lastIndex}"]`
    ) as HTMLElement;
    if (!target) return;

    // ПЕРЕНОСИМ КАРЕТКУ НА ДРУГУЮ СТРОКУ!!! ЕСЛИ НА КОНЦЕ СТРОКИ!!!!
    if (typedText.endsWith(" ")) {
      const nextElem = container.querySelector(
        `[data-index="${lastIndex + 1}"]`
      ) as HTMLElement;
      // Если следующий элемент существует и отрисован на следующей строке...
      if (nextElem && nextElem.offsetTop > target.offsetTop) {
        // Переносим каретку в начало следующей строки.
        gsap.to(caret, {
          x: nextElem.offsetLeft,
          y: nextElem.offsetTop,
          duration: 0.1,
          ease: "power1.out",
        });
        return;
      }
    }

    // ПРОСТО ДВИГАЕМ КАРЕТКУ ЕСЛИ НИЧЕГО НА СРАБОТАЛОООО!!!!!!!!!!!!!!!!!!
    const caretX = target.offsetLeft + target.offsetWidth;
    const caretY = target.offsetTop;
    gsap.to(caret, { x: caretX, y: caretY, duration: 0.1, ease: "power1.out" });
  }, [typedText, containerRef]);
};
