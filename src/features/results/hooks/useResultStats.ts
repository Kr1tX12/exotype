import { generateStats } from "@/lib/utils/test-stats-generator";
import { useStore } from "@/store/store";
import { useEffect, useRef } from "react";
import { pushResultsToDb } from "../api/pushResultsToDb";
import { getTestValue } from "@/lib/utils/schema-utils";
import {
  convertWPM,
  getTestDifficulty,
  TestSettings,
} from "@/lib/utils/getTestDifficulty";
import { TestType } from "@prisma/client";
import { useStats } from "../components/stats-provider";

export const useResultStats = () => {
  const { stats, setStats } = useStats();
  const lastPushedTime = useRef(0);

  useEffect(() => {
    const {
      startTestTime,
      endTestTime,
      typedText,
      targetText,
      stats: { letterTimestamps },
      typingParams,
    } = useStore.getState();
    const typedWords = typedText.split(" ");
    const targetWords = targetText.split(" ");

    const {
      aggregateStats: {
        wpm,
        rawWpm,
        accuracy,
        consistency,
        totalTimeMinutes,
        incorrectChars,
        maxWordWpm,
        minWordWpm,
      },
      detailedLog: { words },
    } = generateStats({
      startTime: startTestTime,
      endTime: endTestTime,
      typedWords,
      targetWords,
      letterTimestamps,
    });

    const testSettings: TestSettings = {
      testType: typingParams.mode.toUpperCase() as TestType,
      testValue: getTestValue(typingParams),
      punctuation: typingParams.punctuation,
      dictionary: 200,
    };

    const difficulty = getTestDifficulty(testSettings);
    const convertedWpm = convertWPM(wpm, testSettings);

    setStats({
      wpm,
      accuracy,
      consistency,
      totalTimeMinutes,
      mistakes: incorrectChars,
      maxWordWpm,
      minWordWpm,
      rawWpm,
      convertedWpm,
      difficulty,
      words,
      startTestTime,
      endTestTime,
      targetText,
      targetWords,
      typedText,
      typedWords,
      typingParams,
    });
  }, [setStats]);

  useEffect(() => {
    if (
      !stats ||
      lastPushedTime.current === stats.startTestTime ||
      stats.startTestTime === 0
    )
      return;

    lastPushedTime.current = stats?.startTestTime ?? 0;

    pushResultsToDb({
      typedText: stats.typedText,
      targetText: stats.targetWords.slice(0, stats.typedWords.length).join(" "),
      startTestTime: stats.startTestTime,
      endTestTime: stats.endTestTime,
      testType: stats.typingParams.mode.toUpperCase(),
      testValue: getTestValue(stats.typingParams),
      punctuation: Boolean(stats.typingParams.punctuation),
      dictionary: 200,
      wpm: stats.wpm,
    });
  }, [stats]);
};
