'use client'

import { useCallback, useEffect, useRef } from "react";

export const TypingText = () => {

  const textContainerRef = useRef<HTMLDivElement>(null);

  const typedWords = useRef<string[]>([]);
  const targetWords = useRef(["Этот", "текст", "писать", "надо", "сука."]);

  
  const initText = useCallback(() => {
    targetWords.current.forEach((word) => {
      for (let i = 0; i < word.length; i++) {
        addSymbol(word[i]);
      }
      addSymbol(" ");
    });
  }, [])
  
  useEffect(() => {
    initText();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Space") {
        typedWords.current.push("");
      } else if (e.key === "Backspace") {
        removeSymbol();
      } else if (e.key.length === 1) {
        typedWords.current[typedWords.current.length - 1] += e.key;
        addSymbol(e.key)
      }
    }


    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [initText])



  const addSymbol = (symbol: string) => {
    const symbolElement = document.createElement('span');
    symbolElement.innerHTML = symbol;
    textContainerRef.current?.appendChild(symbolElement);
  }

  const removeSymbol = () => {
    typedWords.current.pop();
    const lastSymbolElement = textContainerRef.current?.lastChild;
    if (lastSymbolElement) {
      textContainerRef.current?.removeChild(lastSymbolElement);
    }
  }

  return (
    <div className="relative flex flex-col gap-4 justify-center w-full">
      <div ref={textContainerRef} className="">

      </div>
    </div>
  )
}