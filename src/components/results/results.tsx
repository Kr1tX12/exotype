import { generateTestStats } from "@/lib/utils/test-stats-generator";
import { Keyboard } from "../keyboard/keyboard";
import { SpeedChart } from "./components/charts/speed-chart";
import { useStore } from "@/store/store";
import { AnimatedTabs, Tab } from "../ui/animated-tabs";
import { useState } from "react";
import { ResultActionsGroup } from "./components/actions-group/result-actions-group";

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
      <div className="grid grid-cols-[1fr_170px_1fr] gap-6 max-xl:grid-cols-1">
        <div className="bg-muted/30 w-full min-w-96 rounded-xl py-4 px-9">
          <SpeedChart />
        </div>
        <div className="bg-muted/30 py-8 px-2 rounded-xl flex flex-col gap-8 text-center max-xl:-order-1">
          <div>
            <h1 className="text-5xl text-primary">{wpm}</h1>
            <p className="text-foreground/70">WPM</p>
          </div>
          <div>
            <h1 className="text-5xl text-primary">{accuracy}%</h1>
            <p className="text-foreground/70">Точность</p>
          </div>
        </div>
        <div className="bg-muted/30 w-full rounded-xl p-9 min-w-96 flex items-center justify-center">
          <Keyboard scale={0.9} />
        </div>
      </div>

      <ResultActionsGroup />
    </div>
  );
};
