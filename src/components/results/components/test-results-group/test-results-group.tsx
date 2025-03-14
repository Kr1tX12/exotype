import { ResultItem } from "./subcomponents/result-item";

export const TestResultsGroup = () => {
  return (
    <div className="flex gap-12 w-full justify-center">
      <ResultItem label="Raw WPM">120</ResultItem>
      <ResultItem label="Макс WPM">228</ResultItem>
      <ResultItem label="Ошибки">12</ResultItem>
      <ResultItem label="Время">12:10</ResultItem>
    </div>
  );
};
