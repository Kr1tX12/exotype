"use client";

import { useStore } from "@/store/store";
import { useEffect } from "react";
import { start } from "repl";
import { useReloadTest } from "./useReloadTest";

export const useKeyDownHandler = () => {
  // -------------------
  // ЧТОБЫ ПИСАТЬ МОЖНО БЫЛО НОРМАЛЬНО!!!!!!!
  // -------------------

  const typedText = useStore((state) => state.typedText);
  const needText = useStore((state) => state.needText);
  const updateTypedText = useStore((state) => state.updateTypedText);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // НЕ НАЖИМАЙТЕ НА ЭТИ КНОПКИ!!!!!!!!!!
      if (
        e.key === "Shift" ||
        e.key === "Alt" ||
        e.key === "Control" ||
        e.key === "Meta"
      ) {
        return;
      }

      if (e.ctrlKey && e.key === "Backspace") {
        // УДАЛЯЕМ ВСЁЁЁ СЛОВОООО!!!!
        updateTypedText((prev: string) => {
          let i = prev.length - 1;
          while (i >= 0 && prev[i] === " ") i--;
          while (i >= 0 && prev[i] !== " ") i--;
          return prev.slice(0, i + 1);
        });
      } else if (e.key === "Backspace") {
        // УДАЛЯЕМ один символ..........................

        updateTypedText((prev) => prev.slice(0, prev.length - 1));
      } else if (e.key === "Enter") {
        // ЭТО НЕ НУЖНО!!!!!!!
        updateTypedText((prev) => prev + "\\n");
      } else if (e.key === " ") {
        updateTypedText((prev) => {
          // Нельзя ставить два пробела подряд!
          if (
            (prev.length > 0 && prev[prev.length - 1] === " ") ||
            prev.length === 0
          ) {
            return prev;
          }
          // Нормально, можно
          if (needText[prev.length] === " ") {
            return prev + " ";
          }

          return prev + " ";
        });
      } else if (e.key.length === 1) {
        // ПРосто БУКВААААААААААААААААААААААА!!!!!!!!!!!!!!
        updateTypedText((prev) => prev + e.key);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [needText, typedText]);
};
