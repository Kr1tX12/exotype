import { Test } from "@prisma/client";

export interface DBTestStats {
  durationMs: number;
  durationMinutes: number;
  rawWpm: number;
  wpm: number;
  mistakes: number;
  accuracy: number;
  consistency: string;
}

export const generateDbTestStats = (test: Test): DBTestStats => {
  const startTime = Number(test.startTestTime);
  const endTime = Number(test.endTestTime);

  const durationMs = endTime - startTime;
  const durationMinutes = durationMs / 60000;

  const typedText = test.typedText;
  const targetText = test.targetText;

  const rawWpm =
    durationMinutes > 0 ? typedText.length / 5 / durationMinutes : 0;

  let mistakes = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] !== targetText[i]) {
      mistakes++;
    }
  }

  mistakes += Math.abs(typedText.length - targetText.length);

  const correctLetters = targetText.length - mistakes;
  const accuracy =
    targetText.length > 0
      ? Math.round((correctLetters / targetText.length) * 100)
      : 0;

  const wpm = Math.round(rawWpm * (accuracy / 100));

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
