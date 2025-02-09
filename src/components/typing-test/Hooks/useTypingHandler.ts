"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";


// Assuming needText is imported or declared globally.
// If needed, you may import or pass needText as a parameter to the hook.
const needText = `Многие народы увлекаются расширением сознания. Для этого применяются различные вещества и заклинания. Расширив таким образом своё сознание, народы некоторое время охуевши наблюдают вращение бесконечного пространства...`;

export const useTypingHandler = () => {
  const [text, setText] = useState("");
  // Исходный текст, который необходимо ввести.

  // Разбиваем текст на части – splitText возвращает массив строк/слов.
  // Каждый элемент отрендерен с data-index для позиционирования каретки.
  const words = useMemo(() => needText.split(' '), [needText]);

  const containerRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore modifier keys
      if (
        e.key === "Shift" ||
        e.key === "Alt" ||
        e.key === "Control" ||
        e.key === "Meta"
      ) {
        return;
      }

      if (e.key === "Tab") {
        // Clear text on Tab press
        setText("");
      } else if (e.ctrlKey && e.key === "Backspace") {
        // Ctrl+Backspace – delete the previous word
        setText((prev) => {
          let i = prev.length - 1;
          while (i >= 0 && prev[i] === " ") i--;
          while (i >= 0 && prev[i] !== " ") i--;
          return prev.slice(0, i + 1);
        });
      } else if (e.key === "Backspace") {
        // Remove the last character
        setText((prev) => prev.slice(0, -1));
      } else if (e.key === "Enter") {
        // Optionally add a newline
        setText((prev) => prev + "\\n");
      } else if (e.key === " ") {
        setText((prev) => {
          // Prevent duplicate spaces if last character already is a space
          if (prev.length > 0 && prev[prev.length - 1] === " ") {
            return prev;
          }
          // Check if user is at the end of a word:
          // If at the beginning or if the current position in needText is a space,
          // then simply add a space.
          if (prev.length === 0 || needText[prev.length] === " ") {
            return prev + " ";
          }
          // Otherwise, user pressed space mid-word.
          // We determine the end of the current word in needText.
          let nextSpaceIndex = needText.indexOf(" ", prev.length);
          if (nextSpaceIndex === -1) {
            nextSpaceIndex = needText.length;
          }
          // Number of characters remaining in the current word.
          const missingLettersCount = nextSpaceIndex - prev.length;
          // Append spaces to effectively 'skip' the remainder of the word then add an extra space.
          return prev + "_".repeat(missingLettersCount) + " ";
        });
      } else if (e.key.length === 1) {
        // Append the typed character
        setText((prev) => prev + e.key);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [needText, text]);

  console.log(text)

  // Эффект для анимации и позиционирования каретки.
  useEffect(() => {
    const container = containerRef.current;
    const caret = caretRef.current;
    if (!container || !caret) return;

    // Если текста нет, ставим каретку в начало.
    if (text.length === 0) {
      gsap.to(caret, { x: 0, y: 0, duration: 0.1, ease: "power1.out" });
      return;
    }

    // Определяем элемент последнего введённого символа.
    const lastIndex = text.length - 1;
    let target = container.querySelector(
      `[data-index="${lastIndex}"]`
    ) as HTMLElement;
    if (!target) return;

    // Если последний символ - пробел, проверяем, не является ли этот пробел концом строки.
    if (text.endsWith(" ")) {
      const nextElem = container.querySelector(
        `[data-index="${text.length}"]`
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

    // Обычный режим - позиционирование каретки сразу после последнего символа.
    const caretX = target.offsetLeft + target.offsetWidth;
    const caretY = target.offsetTop;
    gsap.to(caret, { x: caretX, y: caretY, duration: 0.1, ease: "power1.out" });
  }, [text, containerRef]);

  const progressValue = (text.length / needText.length) * 100;

  const returnData = { text, needText, words, progressValue, containerRef, caretRef };
  console.log(returnData)
  return returnData;
};