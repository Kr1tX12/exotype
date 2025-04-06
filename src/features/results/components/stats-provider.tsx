import { WordStat } from "@/shared/lib/utils/test-stats-generator";
import { TypingParams } from "@/store/slices/typingParams";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type StatsContextType = {
  stats: StatsType;
  setStats: Dispatch<SetStateAction<StatsType>>;
} | null;

type StatsType = {
  wpm: number;
  accuracy: number;
  words: WordStat[];
  minWordWpm: number;
  maxWordWpm: number;
  rawWpm: number;
  convertedWpm: number;
  mistakes: number;
  totalTimeMinutes: number;
  difficulty: number;
  consistency: number | string;
  startTestTime: number;
  endTestTime: number;
  typedText: string;
  targetText: string;
  typedWords: string[];
  targetWords: string[];
  typingParams: TypingParams;
} | null;

const StatsContext = createContext<StatsContextType>(null);

export const StatsProvider = ({ children }: { children: ReactNode }) => {
  const [stats, setStats] = useState<StatsType>(null);

  return (
    <StatsContext.Provider value={{ stats, setStats }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => {
  const stats = useContext(StatsContext);
  if (!stats) {
    throw new Error("useStats must be used within a StatsProvider");
  }
  return stats;
};
