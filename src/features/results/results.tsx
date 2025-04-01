import { useStore } from "@/store/store";
import { AnimatedTabs, Tab } from "../../components/ui/animated-tabs";
import { useEffect, useRef, useState } from "react";
import { ResultActionsGroup } from "./components/actions-group/result-actions-group";
import { TestResultsGroup } from "./components/test-results-group/test-results-group";
import { MainStats } from "./components/tabs/main/main-stats";
import { AnimatePresence, motion } from "framer-motion";
import { generateStats } from "@/lib/utils/test-stats-generator";
import { TextTab } from "./components/tabs/text/text-tab";
import { pushResultsToDb } from "./api/pushResultsToDb";
import { getTestValue } from "@/lib/utils/schema-utils";
import {
  convertWPM,
  getTestDifficulty,
  TestSettings,
} from "@/lib/utils/getTestDifficulty";
import { TestType } from "@prisma/client";

export const Results = () => {
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
  const lastPushedTime = useRef(0);

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

  useEffect(() => {
    if (lastPushedTime.current === startTestTime || startTestTime === 0) return;
    lastPushedTime.current = startTestTime;

    pushResultsToDb({
      typedText,
      targetText: targetWords.slice(0, typedWords.length).join(" "),
      startTestTime,
      endTestTime,
      testType: typingParams.mode.toUpperCase(),
      testValue: getTestValue(typingParams),
      punctuation: Boolean(typingParams.punctuation),
      dictionary: 200,
      wpm,
    });
  }, [
    endTestTime,
    startTestTime,
    targetText,
    typedText,
    typingParams,
    targetWords,
    typedWords.length,
    wpm,
  ]);

  const [activeIndex, setActiveIndex] = useState(0);

  const testSettings: TestSettings = {
    testType: typingParams.mode.toUpperCase() as TestType,
    testValue: getTestValue(typingParams),
    punctuation: typingParams.punctuation,
    dictionary: 200,
  };

  const difficulty = getTestDifficulty(testSettings);
  const convertedWpm = convertWPM(wpm, testSettings);

  return (
    <div className="size-full flex flex-col gap-8 container">
      <AnimatedTabs
        id="results"
        className="self-center"
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      >
        <Tab index={0}>Основное</Tab>
        <Tab locked index={1}>
          Текст
        </Tab>
        <Tab locked index={2}>
          Реплей
        </Tab>
        <Tab locked index={3}>
          Вся информация
        </Tab>
      </AnimatedTabs>
      <div className="w-full h-72 overflow-y-auto relative">
        <AnimatePresence mode="popLayout">
          {
            {
              "0": <MainStats key={0} wpm={wpm} accuracy={accuracy} />,
              "1": (
                <TextTab
                  words={words}
                  minWordWpm={minWordWpm}
                  maxWordWpm={maxWordWpm}
                />
              ),
            }[activeIndex]
          }
        </AnimatePresence>
      </div>
      <motion.div layout className="flex flex-col gap-8">
        <TestResultsGroup
          rawWpm={rawWpm}
          maxWpm={maxWordWpm}
          convertedWpm={convertedWpm}
          mistakes={incorrectChars}
          time={totalTimeMinutes}
          difficulty={difficulty}
          consistency={consistency}
        />
        <ResultActionsGroup />
      </motion.div>
    </div>
  );
};
