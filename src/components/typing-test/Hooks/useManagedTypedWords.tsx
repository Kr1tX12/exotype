import { useState, useEffect, useRef } from "react";
import { List } from "immutable";
import { useStore } from "@/store/store";

export const useManagedTypedWords = (typedText: string) => {
  return typedText.split(" ");
  const [words, setWords] = useState<List<string>>(List([""]));
  const prevTypedTextRef = useRef(typedText);
  const needText = useStore((state) => state.needText);

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

  useEffect(() => {
    setWords(List([""]));
  }, [needText]);

  return words.toArray();
};
