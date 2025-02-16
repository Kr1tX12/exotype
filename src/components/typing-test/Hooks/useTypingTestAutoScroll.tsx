import { RefObject, useEffect, useState } from "react";
import gsap from "gsap";
import { useStore } from "@/store/store";
import { Stethoscope } from "lucide-react";
import { getWordIndexFromLetterIndex } from "../utils/getWordIndexFromLetterIndex";

export const useTypingTestAutoScroll = ({
  containerRef,
  typedWords,
  prevLettersLength,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
  typedWords: string[];
  prevLettersLength: number;
}) => {
  const typedText = useStore((state) => state.typedText);

  const [startLetterIndex, setStartLetterIndex] = useState(0);

  // ВЫСОТА ТЕКСТА 3 СТРОЧКИ ИИИИИ????
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const computedStyle = window.getComputedStyle(container);
    let lineHeightStr = computedStyle.lineHeight;
    let lineHeightPx = parseFloat(lineHeightStr);
    if (isNaN(lineHeightPx)) {
      const fontSize = parseFloat(computedStyle.fontSize);
      lineHeightPx = fontSize * 1.2;
    }
    // 3 СТРОКИ ДАА ДАД АДА А ДАДАДД АДА
    container.style.height = `${lineHeightPx * 3}px`;
  }, [containerRef]);

  // ЧТО ДЕЛАЕМ КОГДА МЕНЯЕТСЯ ТЕЕЕКСТ!!
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const computedStyle = window.getComputedStyle(container);
    let lineHeightStr = computedStyle.lineHeight;
    let lineHeight = parseFloat(lineHeightStr);
    if (isNaN(lineHeight)) {
      const fontSize = parseFloat(computedStyle.fontSize);
      lineHeight = fontSize * 1.2;
    }

    // ТЕКСТА НЕТ! СТавим в НАЧАЛО!!!!
    if (typedText.length === 0) {
      gsap.to(container, { scrollTop: 0, duration: 0.2, ease: "power1.out" });
      return;
    }

    // ПОЛУЧАЕМ ЭЛЕМЕНТ!!! ПОСЛЕДНЕГО СИМВОЛА!!!!
    const index = typedText.endsWith(" ")
      ? prevLettersLength + typedWords[typedWords.length - 1].length
      : prevLettersLength + typedWords[typedWords.length - 1].length - 1;

    const target = container.querySelector(
      `[data-index="${index}"]`
    ) as HTMLElement;
    if (!target) return;

    // СКРОЛЛЛЛЛЛИМ ВНИЗ ЕСЛИ ДАЛЬШЕ НУЖНО!!!!!!!!!!!!!!!!!!!!!!!!
    let newScrollTop =
      target.offsetTop < lineHeight ? 0 : target.offsetTop - lineHeight;

    const maxScrollTop = container.scrollHeight - container.clientHeight;

    if (newScrollTop > maxScrollTop) {
      newScrollTop = maxScrollTop;
    }

    if (Math.abs(container.scrollTop - newScrollTop) < lineHeight) return;

    gsap.to(container, {
      scrollTop: newScrollTop,
      duration: 0.3, // Увеличиваем длительность анимации
      ease: "power2.out", // Более плавное замедление
      overwrite: "auto", // Автоматическое перезаписывание анимаций
    });

    const startLetterIndex = getStartLetterIndex(
      index,
      container,
    );
    if (startLetterIndex) setStartLetterIndex(startLetterIndex);
  }, [typedWords, containerRef]);

  return { startWordsIndex: getWordIndexFromLetterIndex({letterIndex: startLetterIndex, typedWords}) };
};

const getStartLetterIndex = (
  lastIndex: number,
  container: HTMLDivElement,
) => {
  let i = lastIndex;
  // СНАЧАЛА БЛЯТЬ СТРОКА ГДЕ ПОЛЬЗОВАТЕЛЬ, ПОТОМ ВЫШЕ СТРОКИ
  const linesY: {
    y: number;
    i: number;
  }[] = [];

  // Заполняем LINESY ВСЕМИ БУКВАМи Которые ПОЛЬЗОватель Уже НАПисал
  while (true) {
    const target = container.querySelector(
      `[data-index="${i}"]`
    ) as HTMLElement;

    if (!target) break;

    linesY.push({ y: target.offsetTop, i });

    i--;
  }

  // ГРУППИРУЕМ ПО ВЫСОТЕЕЕЕЕЕЕ! ЧТОБЫ ПОТОМ УДАЛИТЬ, КОТОРЫЕ НЕ ВИДНО!!!!
  const yGroups: { y: number; startIndex: number; endIndex: number }[] = [];

  linesY.forEach((item) => {
    if (yGroups.length === 0) {
      yGroups.push({ y: item.y, startIndex: item.i, endIndex: item.i });
    } else {
      const lastGroup = yGroups[yGroups.length - 1];

      if (lastGroup.y === item.y) {
        lastGroup.startIndex = item.i;
      } else {
        yGroups.push({ y: item.y, startIndex: item.i, endIndex: item.i });
      }
    }
  });

  console.log(yGroups);
  console.log()

  if (yGroups.length > 2) {
    const groupToDelete = yGroups[2];


    return groupToDelete.endIndex;
  }
};



// КОНЕЦ!!!!!!!!!!!!!!!!!
