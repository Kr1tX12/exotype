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
      type = "skipped";
      charToShow = targetChar;
    } else if (targetChar === undefined && tChar !== undefined) {
      type = "extra";
      charToShow = tChar;
    } else if (tChar === targetChar) {
      type = "equal";
      charToShow = targetChar;
    } else {
      type = "incorrect";
      charToShow = targetChar;
    }

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
                <span
                  key={index}
                  className={
                    {
                      skipped: "text-target-text",
                      extra: "text-extra-wrong",
                      incorrect: "text-wrong",
                    }[seg.type]
                  }
                >
                  {seg.text}
                </span>
              )
            )}
            {i < maxWords - 1 ? " " : ""}
          </React.Fragment>
        );
      })}
    </p>
  );
};
