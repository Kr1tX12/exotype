import { TestType } from "@prisma/client";

export type TestSettings = {
  testType: TestType;
  testValue: number;
  punctuation?: boolean;
  dictionary?: number;
};

// Исходная функция расчёта сложности (для отображения)
export const getTestDifficulty = ({
  testType,
  testValue,
  punctuation = false,
  dictionary = 0,
}: TestSettings): number => {
  const typeMultiplyer = {
    WORDS: 10,
    TIME: 15,
    AI: 150,
    TEXT: 0,
    FREE: 0,
    CUSTOM: 0,
  }[testType];

  const dictionaryMultiplyer =
    testType !== "AI" ? Math.log(dictionary * 0.01) : 2;
  const punctuationMultiplyer = punctuation || testType === "AI" ? 1.4 : 1;
  const multiplyer =
    typeMultiplyer * dictionaryMultiplyer * punctuationMultiplyer;

  return Math.max(Math.round(Math.log(testValue * multiplyer) * 20 - 50), 1);
};

const getRawDifficulty = ({
  testType,
  testValue,
  punctuation = false,
  dictionary = 0,
}: TestSettings): number => {
  const typeMultiplyer = {
    WORDS: 10,
    TIME: 15,
    AI: 150,
    TEXT: 0,
    FREE: 0,
    CUSTOM: 0,
  }[testType];

  const dictionaryMultiplyer =
    testType !== "AI" ? Math.log(dictionary * 0.01) : 1;
  const punctuationMultiplyer = punctuation || testType === "AI" ? 1.4 : 1;
  const multiplyer =
    typeMultiplyer * dictionaryMultiplyer * punctuationMultiplyer;

  return Math.log(testValue * multiplyer) * 20;
};

export const convertWPM = (
  oldWPM: number,
  oldSettings: TestSettings,
  newSettings: TestSettings = {
    testType: "TIME",
    testValue: 15,
    punctuation: false,
    dictionary: 200,
  }
): number => {
  const oldRaw = getRawDifficulty(oldSettings);
  const newRaw = getRawDifficulty(newSettings);

  const conversionFactor = oldRaw / newRaw;

  return Math.round(oldWPM * conversionFactor);
};
