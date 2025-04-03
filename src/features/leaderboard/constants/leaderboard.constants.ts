import { Languages } from "@/constants";
import { TestType } from "@prisma/client";

export const LEADERBOARD_ANIMATION_DURATION = 150;
export const LEADERBOARD_LANGUAGES = [
  {
    language: Languages.EN,
    label: "Английский",
  },
  {
    language: Languages.RU,
    label: "Русский",
  },
  {
    language: Languages.FR,
    label: "Французский",
  },
  {
    language: Languages.DE,
    label: "Немецкий",
  },
];

type LeaderboardTestTypesType = { testType: TestType; label: string }[];

export const LEADERBOARD_TEST_TYPES: LeaderboardTestTypesType = [
  {
    testType: "TIME",
    label: "Время",
  },
  {
    testType: "WORDS",
    label: "Слова",
  },
];

type LeaderboardTestValuesType = {
  [key in TestType]: {
    testValue: number;
    label: string;
  }[];
};
export const LEADERBOARD_TEST_VALUES: LeaderboardTestValuesType = {
  WORDS: [
    {
      testValue: 10,
      label: "10",
    },
    {
      testValue: 100,
      label: "100",
    },
  ],
  TIME: [
    {
      testValue: 15,
      label: "15",
    },
    {
      testValue: 60,
      label: "60",
    },
  ],
  TEXT: [],
  FREE: [],
  AI: [],
};
