import { StatsProvider } from "./components/stats-provider";
import { ResultsWithinProvider } from "./components/results-within-provider";

export const Results = () => {
  return (
    <StatsProvider>
      <ResultsWithinProvider />
    </StatsProvider>
  );
};
