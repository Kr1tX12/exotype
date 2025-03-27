import { TestType } from "@prisma/client";

export const getTestDifficulty = ({
  testType,
  testValue,
  punctuation = false,
  dictionary = 0,
}: {
  testType: TestType;
  testValue: number;
  punctuation?: boolean;
  dictionary?: number;
}) => {
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
  const punctuationMultiplyer = punctuation || testType == "AI" ? 1.4 : 1;
  const multiplyer =
    typeMultiplyer * dictionaryMultiplyer * punctuationMultiplyer;

  return Math.max(Math.round(Math.log(testValue * multiplyer) * 20 - 50), 1);
};
