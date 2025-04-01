import { TestType } from "@prisma/client";

export type ReplaceBigIntTest = {
  id: string;
  userStatsId: string;
  testType: TestType;
  testValue: number;
  typedText: string;
  targetText: string;
  startTestTime: number;
  endTestTime: number;
  punctuation: boolean;
  dictionary: number;
};

export type ReplaceBigIntRecordTest = {
  id: string;
  userStatsId: string;
  testType: TestType;
  testValue: number;
  typedText: string;
  targetText: string;
  startTestTime: number;
  endTestTime: number;
  wpm: number;
};
