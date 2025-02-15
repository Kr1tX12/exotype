import { useState, useEffect, useRef } from "react";
import { List } from "immutable";

export const useManagedTypedWords = (typedText: string) => {
  // вызываем функцию
  // Задаём тип List<string> явно
  const [words, setWords] = useState<List<string>>(List([""]));
  const prevTypedTextRef = useRef(typedText);
  
  useEffect(() => {
    const prev = prevTypedTextRef.current;
    const current = typedText;
    if (current === prev) return;

    let newWords: List<string> = words;
    if (current.length > prev.length) {
      const added = current.slice(prev.length);
      for (const char of added) {
        if (char === " ") {
          newWords = newWords.push("");
        } else {
          const lastIdx = newWords.size - 1;
          // Используем (word ?? "") чтобы быть уверенными, что word не undefined
          newWords = newWords.update(lastIdx, (word) => (word ?? "") + char);
        }
      }
    } else {
      const removedCount = prev.length - current.length;
      for (let i = 0; i < removedCount; i++) {
        const lastIdx = newWords.size - 1;
        const lastWord = newWords.get(lastIdx);
        if (lastWord !== undefined && lastWord.length > 0) {
          newWords = newWords.update(lastIdx, (word) =>
            (word ?? "").slice(0, -1)
          );
        } else if (newWords.size > 1) {
          newWords = newWords.pop();
        }
      }
    }
    
    prevTypedTextRef.current = current;
    setWords(newWords);
  }, [typedText, words]);
  // Преобразуем в обычный массив – это операция O(1) благодаря структурному совместному использованию


  return words.toArray();
};
