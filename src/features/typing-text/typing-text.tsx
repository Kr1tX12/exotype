"use client";

import styles from "./typing-text.module.css";
import { useCallback, useEffect, useRef } from "react";

export const TypingText = () => {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);

  const typedWords = useRef<string[]>([""]);
  const targetWords = useRef(["Этот", "текст", "писать", "надо", "сука."]);

  const nextSymbol = useRef<HTMLSpanElement>(null);

  const initText = useCallback(() => {
    targetWords.current.forEach((word) => {
      for (let i = 0; i < word.length; i++) {
        addSymbol(word[i]);
      }
      addSymbol(" ");
    });

    nextSymbol.current = textContainerRef.current
      ?.firstChild as HTMLSpanElement;
  }, []);

  const writeSymbol = useCallback((symbol: string) => {
    const nextSymbolElement = nextSymbol.current;
    if (!nextSymbolElement) return;

    nextSymbolElement.classList.remove(styles["target-letter"]);
    nextSymbolElement.classList.add(styles["typed-letter"]);

    if (symbol === nextSymbolElement.textContent) {
      nextSymbolElement.classList.add(styles["correct-typed-letter"]);
    } else {
      nextSymbolElement.classList.add(styles["wrong-typed-letter"]);
    }

    nextSymbol.current = nextSymbolElement.nextSibling as HTMLSpanElement;
    updateCaretPosition();
  }, []);

  const removeSymbol = useCallback(() => {
    const wordNow = typedWords.current[typedWords.current.length - 1];
    typedWords.current[typedWords.current.length - 1] = wordNow.slice(0, -1);

    const lastSymbolElement = nextSymbol.current
      ?.previousSibling as HTMLSpanElement;
    if (lastSymbolElement && textContainerRef.current) {
      lastSymbolElement.classList.remove(styles["typed-letter"]);
      lastSymbolElement.classList.remove(styles["correct-typed-letter"]);
      lastSymbolElement.classList.remove(styles["wrong-typed-letter"]);
      lastSymbolElement.classList.add(styles["target-letter"]);
      nextSymbol.current = lastSymbolElement;
    }
    updateCaretPosition();
  }, []);

  useEffect(() => {
    initText();
    updateCaretPosition();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Space") {
        typedWords.current.push("");
      } else if (e.key === "Backspace") {
        removeSymbol();
      } else if (e.key.length === 1) {
        typedWords.current[typedWords.current.length - 1] += e.key;
        writeSymbol(e.key);
      }

      console.log(typedWords);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [initText, removeSymbol, writeSymbol]);

  const addSymbol = (symbol: string) => {
    const symbolElement = document.createElement("span");
    symbolElement.innerHTML = symbol;
    symbolElement.classList.add(styles["target-letter"]);
    textContainerRef.current?.appendChild(symbolElement);
  };

  const updateCaretPosition = () => {
    if (!caretRef.current || !nextSymbol.current) return;

    const symbolRect = nextSymbol.current?.getBoundingClientRect();
    const containerRect = textContainerRef.current?.getBoundingClientRect();

    if (!symbolRect || !containerRect) return;
    const left = symbolRect.left - containerRect.left;
    const top = symbolRect.top - containerRect.top;

    caretRef.current.style.transform = `translate(${left}px, ${top}px)`;
  };

  return (
    <div className="relative flex flex-col gap-4 justify-center w-full">
      <div ref={textContainerRef} className="text-5xl leading-snug"></div>
      <div
        ref={caretRef}
        className="h-12 w-1 bg-caret rounded-full absolute transition-transform top-2"
      />
    </div>
  );
};
