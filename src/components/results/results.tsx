import { generateTestStats } from "@/lib/utils/test-stats-generator";
import { Keyboard } from "../keyboard/keyboard";
import { SpeedChart } from "./components/charts/speed-chart";
import { useStore } from "@/store/store";

export const Results = () => {
  const {
    startTestTime,
    endTestTime,
    typedText,
    needText,
    stats: { wpmHistory, rawWpmHistory },
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
    endTestTime
  })

  return (
    <div className="container grid grid-cols-[1fr_170px_1fr] gap-6 max-xl:grid-cols-1">
      <div className="bg-muted/10 w-full min-w-96 rounded-lg py-4 px-9">
        <SpeedChart />
      </div>
      <div className="bg-muted/10 py-8 px-2 rounded-lg flex flex-col gap-8 text-center max-xl:-order-1">
        <div>
          <h1 className="text-5xl correct-letter-shadow">{wpm}</h1>
          <p className="text-foreground/70">WPM</p>
        </div>
        <div>
          <h1 className="text-5xl correct-letter-shadow">{accuracy}%</h1>
          <p className="text-foreground/70">Точность</p>
        </div>
      </div>
      <div className="bg-muted/10 w-full rounded-lg p-9 min-w-96 flex items-center justify-center">
        <Keyboard scale={0.6} />
      </div>
    </div>
  );
};
