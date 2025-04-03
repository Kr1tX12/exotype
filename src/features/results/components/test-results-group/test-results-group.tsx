import { formatTime } from "@/lib/utils";
import { ResultItem } from "./subcomponents/result-item";
import { useStats } from "../stats-provider";

export const TestResultsGroup = () => {
  const { stats } = useStats();
  if (!stats) return;
  const {
    rawWpm,
    maxWordWpm: maxWpm,
    convertedWpm,
    mistakes,
    difficulty,
    totalTimeMinutes,
    consistency,
  } = stats;

  return (
    <div className="flex gap-12 w-full justify-center">
      <ResultItem label="Raw WPM">{Math.round(rawWpm).toString()}</ResultItem>
      <ResultItem label="Макс WPM">{Math.round(maxWpm).toString()}</ResultItem>
      <ResultItem label="Реальный WPM">
        {Math.round(convertedWpm).toString()}
      </ResultItem>
      <ResultItem label="Ошибки">{mistakes.toString()}</ResultItem>
      <ResultItem label="Время">
        {formatTime(totalTimeMinutes * 1000 * 60)}
      </ResultItem>
      <ResultItem label="Сложность">{difficulty.toString()}</ResultItem>
      <ResultItem label="Консистенция">{consistency.toString()}</ResultItem>
    </div>
  );
};
