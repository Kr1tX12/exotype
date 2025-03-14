import { generateTestStats } from "@/lib/utils/test-stats-generator";
import { useStore } from "@/store/store";
import { AnimatedTabs, Tab } from "../ui/animated-tabs";
import { useState } from "react";
import { ResultActionsGroup } from "./components/actions-group/result-actions-group";
import { TestResultsGroup } from "./components/test-results-group/test-results-group";
import { MainStats } from "./components/tabs/main/main-stats";
import { AnimatePresence, motion } from "framer-motion";

export const Results = () => {
  const {
    startTestTime,
    endTestTime,
    typedText,
    needText,
    stats: { rawWpmHistory, wpmHistory },
  } = useStore.getState();
  const typedWords = typedText.split(" ");
  const needWords = needText.split(" ");

  const {
    wpm,
    rawWpm,
    accuracy,
    consistency,
    extraChars,
    missedChars,
    correctChars,
    incorrectChars,
    wordsWithErrors,
    wordsWithoutErrors,
    totalTime,
    errorsByLetter,
  } = generateTestStats({
    startTime: startTestTime,
    endTime: endTestTime,
    typedWords,
    needWords,
    rawWpmHistory,
  });

  console.log({
    wpm,
    rawWpm,
    accuracy,
    consistency,
    extraChars,
    missedChars,
    correctChars,
    incorrectChars,
    wordsWithErrors,
    wordsWithoutErrors,
    totalTime,
    errorsByLetter,
    startTestTime,
    endTestTime,
    wpmHistory,
    rawWpmHistory,
  });

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="size-full flex flex-col gap-8 container">
      <AnimatedTabs
        className="self-center"
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      >
        <Tab index={0}>Основное</Tab>
        <Tab index={1}>Текст</Tab>
        <Tab index={2}>Реплей</Tab>
        <Tab index={3}>Вся информация</Tab>
      </AnimatedTabs>
      <AnimatePresence mode="popLayout">
        {
          { "0": <MainStats key={0} wpm={wpm} accuracy={accuracy} /> }[
            activeIndex
          ]
        }
      </AnimatePresence>
      <motion.div layout>
        <TestResultsGroup />
        <ResultActionsGroup />
      </motion.div>
    </div>
  );
};
