import { RefObject, useLayoutEffect } from "react";
import gsap from "gsap";
import { useStore } from "@/store/store";

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
  // -------------------
  // ЭТА ХЕРНЯ ДВИГАЕТ КАРЕТКУ НЕ ТРОГАТЬ!!!!!! РАБОТАЕТ !!!!!!!
  // -------------------
  const typedText = useStore((state) => state.typedText);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const caret = caretRef.current;
    if (!container || !caret) return;

    // ОТЛОЖЕННЫЙ ЗАПУСК, ЧТОБЫ ВСЁ УСПЕЛО ОБНОВИТЬСЯ И НЕ БЫЛО СКАЧКОВ

      gsap.killTweensOf(caret);

      // Текста нет! Ставим в НАЧАЛО!!!!
      if (typedWords.length === 1 && typedWords[0] === "") {
        gsap.to(caret, { x: 0, y: 0, duration: 0.1, ease: "power1.out" });
        return;
      }

      // ПОЛУЧАЕМ ЭЛЕМЕНТ!!! ПОСЛЕДНЕГО СИМВОЛА!!!!
      const lastIndex = Math.max(
        0,
        prevLettersLength + (typedWords[typedWords.length - 1]?.length || 0) - 1
      );
      const target = container.querySelector(
        `[data-index="${lastIndex}"]`
      ) as HTMLElement;
      if (!target) return;

      // Если последний символ – пробел, пытаемся получить следующий элемент
      if (typedText[typedText.length - 1] === " ") {
        const nextElem = container.querySelector(
          `[data-index="${lastIndex + 1}"]`
        ) as HTMLElement;
        if (nextElem && nextElem.offsetTop > target.offsetTop) {
          gsap.to(caret, {
            x: nextElem.offsetLeft,
            y: nextElem.offsetTop,
            duration: 0.3,
            ease: "power1.out",
          });
          return;
        }
      }

      console.log(`БУКва на котОРУЮ ДВИГАЕТ КАРЕТКА: ${target.textContent}`);

      // ПРОСТО ДВИГАЕМ КАРЕТКУ ЕСЛИ НИЧЕГО НЕ СРАБОТАЛО!!!!
      const caretX = target.offsetLeft + target.offsetWidth;
      const caretY = target.offsetTop;
      gsap.to(caret, {
        x: caretX,
        y: caretY,
        duration: 0.1,
        ease: "power1.out",
      });
  }, [
    typedText,
    prevLettersLength,
    typedWords,
    containerRef,
    caretRef,
    startWordsIndex,
  ]);
};
