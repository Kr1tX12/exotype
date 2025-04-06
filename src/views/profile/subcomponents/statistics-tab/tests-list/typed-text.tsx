import React from "react";

type DiffSegment = {
  type: "equal" | "incorrect" | "extra" | "skipped";
  text: string;
};

function diffWord(typed: string, target: string): DiffSegment[] {
  const segments: DiffSegment[] = [];
  const maxLen = Math.max(typed.length, target.length);

  for (let i = 0; i < maxLen; i++) {
    const tChar = typed[i];
    const targetChar = target[i];
    let type: DiffSegment["type"];
    let charToShow = "";

    if (tChar === undefined && targetChar !== undefined) {
      // Пользователь не ввёл символ, а в target он есть
      type = "skipped";
      charToShow = targetChar;
    } else if (targetChar === undefined && tChar !== undefined) {
      // Пользователь ввёл лишний символ
      type = "extra";
      charToShow = tChar;
    } else if (tChar === targetChar) {
      type = "equal";
      charToShow = targetChar;
    } else {
      // Символы различаются
      type = "incorrect";
      charToShow = targetChar;
    }

    // Объединяем сегменты одного типа
    const lastSegment = segments[segments.length - 1];
    if (lastSegment && lastSegment.type === type) {
      lastSegment.text += charToShow;
    } else {
      segments.push({ type, text: charToShow });
    }
  }

  return segments;
}

export const TypedText = ({
  typedText,
  targetText,
}: {
  typedText: string;
  targetText: string;
}) => {
  // Разбиваем текст на слова по пробелам
  const targetWords = targetText.split(" ");
  const typedWords = typedText.split(" ");
  const maxWords = Math.max(targetWords.length, typedWords.length);

  return (
    <p className="text-typed-text">
      {Array.from({ length: maxWords }).map((_, i) => {
        const targetWord = targetWords[i] || "";
        const typedWord = typedWords[i] || "";
        const segments = diffWord(typedWord, targetWord);

        return (
          <React.Fragment key={i}>
            {segments.map((seg, index) =>
              seg.type === "equal" ? (
                <React.Fragment key={index}>{seg.text}</React.Fragment>
              ) : (
                <span key={index} className={{
                    "skipped": "text-target-text",
                    "extra": "text-extra-wrong",
                    "incorrect": "text-wrong",
                }[seg.type]}>
                  {seg.text}
                </span>
              )
            )}
            {/* Добавляем пробел между словами, если это не последнее слово */}
            {i < maxWords - 1 ? " " : ""}
          </React.Fragment>
        );
      })}
    </p>
  );
};
