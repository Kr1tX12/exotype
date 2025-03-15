import { formatTime } from "@/lib/utils";
import { ResultItem } from "./subcomponents/result-item";

export const TestResultsGroup = ({
  rawWpm,
  maxWpm,
  mistakes,
  time,
}: {
  rawWpm: number;
  maxWpm: number;
  mistakes: number;
  time: number;
}) => {
  return (
    <div className="flex gap-12 w-full justify-center">
      <ResultItem label="Raw WPM">{rawWpm.toString()}</ResultItem>
      <ResultItem label="Макс WPM">{maxWpm.toString()}</ResultItem>
      <ResultItem label="Ошибки">{mistakes.toString()}</ResultItem>
      <ResultItem label="Время">{formatTime(time * 1000 * 60)}</ResultItem>
    </div>
  );
};
