import { LEADERBOARD_TEST_VALUES } from "@/features/leaderboard/constants/leaderboard.constants";
import React from "react";
import { useLeaderboardData } from "../../leaderboard-provider";
import { LeaderboardTestValueItem } from "./leaderboard-test-value-item";
import { AnimatePresence, motion } from "framer-motion";

export const LeaderboardTestValueSettings = () => {
  const { state } = useLeaderboardData();

  const testType = state.testType;

  const testValues = LEADERBOARD_TEST_VALUES[testType];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={testType}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="flex flex-col gap-1"
      >
        {testValues.map((testValue, index) => (
          <LeaderboardTestValueItem
            testValue={testValue.testValue}
            key={`${testValue.label}-${index}`}
          >
            {testValue.label}
          </LeaderboardTestValueItem>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
