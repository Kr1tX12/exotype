import { Test, TestRecord } from "@prisma/client";

export interface DBTestStats {
  durationMs: number;
  durationMinutes: number;
  rawWpm: number;
  wpm: number;
  mistakes: number;
  accuracy: number;
  consistency: string;
}

export const generateDbTestStats = (test: Test | TestRecord): DBTestStats => {
  const startTime = Number(test.startTestTime);
  const endTime = Number(test.endTestTime);

  const durationMs = endTime - startTime;
  const durationMinutes = durationMs / 60000;

  const typedText = test.typedText;
  const targetText = test.targetText;
  const typedWords = typedText.split(" ");
  const targetWords = targetText.split(" ");

  const rawWpm =
    durationMinutes > 0 ? typedText.length / 5 / durationMinutes : 0;

  let mistakes = 0;
  let correctLetters = 0;
  for (let i = 0; i < typedWords.length; i++) {
    const typedWord = typedWords[i] ?? "";
    const targetWord = targetWords[i] ?? "";
    let wordLength;

    if (typedWords.length - 1 === i) wordLength = typedWord.length;
    else wordLength = Math.max(typedWord.length, targetWord.length);

    for (let letI = 0; letI < wordLength; letI++) {
      if (typedWord[letI] !== targetWord[letI]) {
        mistakes++;
      } else {
        correctLetters++;
      }
    }

    if (typedWord === targetWord) correctLetters++;
  }

  const accuracy =
    targetText.length > 0
      ? Math.round((correctLetters / targetText.length) * 100)
      : 0;

  const wpm = rawWpm * (accuracy / 100);

  return {
    durationMs,
    durationMinutes,
    rawWpm: Math.round(rawWpm),
    wpm,
    mistakes,
    accuracy,
    consistency: "N/A",
  };
};
