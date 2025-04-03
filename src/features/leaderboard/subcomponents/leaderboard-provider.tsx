import { Languages } from "@/constants";
import { TestType } from "@prisma/client";
import { createContext, ReactNode, useContext, useReducer } from "react";

type LeaderboardContextType = {
  state: LeaderboardData;
  dispatch: (action: LeaderboardAction) => void;
};

type LeaderboardData = {
  language: Languages;
  testType: TestType;
  testValue: number;
  updatedAt: number;
};

const LeaderboardContext = createContext<LeaderboardContextType | null>(null);

type LeaderboardAction =
  | { type: "SET_LANGUAGE"; payload: Languages }
  | { type: "SET_TEST_TYPE"; payload: TestType }
  | { type: "SET_TEST_VALUE"; payload: number }
  | { type: "SET_UPDATED_AT"; payload: number };

const leaderboardReducer = (
  state: LeaderboardData,
  action: LeaderboardAction
) => {
  switch (action.type) {
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    case "SET_TEST_TYPE":
      return { ...state, testType: action.payload };
    case "SET_TEST_VALUE":
      return { ...state, testValue: action.payload };
    case "SET_UPDATED_AT":
      return { ...state, updatedAt: action.payload };
    default:
      return state;
  }
};
export const LeaderboardProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(leaderboardReducer, {
    language: Languages.EN,
    testType: "TIME",
    testValue: 15,
    updatedAt: 0,
  });

  return (
    <LeaderboardContext.Provider value={{ state, dispatch }}>
      {children}
    </LeaderboardContext.Provider>
  );
};

export const useLeaderboardData = () => {
  const data = useContext(LeaderboardContext);
  if (!data) {
    throw new Error(
      "useLeaderboardData must be used within a LeaderboardProvider"
    );
  }
  return data;
};
