import { formatTime } from "@/lib/utils";
import { ResultItem } from "./subcomponents/result-item";

export const TestResultsGroup = ({
  rawWpm,
  maxWpm,
  mistakes,
  time,
  convertedWpm,
  difficulty,
  consistency,
}: {
  rawWpm: number;
  maxWpm: number;
  mistakes: number;
  time: number;
  convertedWpm: number;
  difficulty: number;
  consistency: number | string;
}) => {
  return (
    <div className="flex gap-12 w-full justify-center">
      <ResultItem label="Raw WPM">{Math.round(rawWpm).toString()}</ResultItem>
      <ResultItem label="Макс WPM">{Math.round(maxWpm).toString()}</ResultItem>
      <ResultItem label="Реальный WPM">{Math.round(convertedWpm).toString()}</ResultItem>
      <ResultItem label="Ошибки">{mistakes.toString()}</ResultItem>
      <ResultItem label="Время">{formatTime(time * 1000 * 60)}</ResultItem>
      <ResultItem label="Сложность">{difficulty.toString()}</ResultItem>
      <ResultItem label="Консистенция">{consistency.toString()}</ResultItem>
    </div>
  );
};
