import { LEADERBOARD_TEST_TYPES } from "@/features/leaderboard/constants/leaderboard.constants";
import { LeaderboardTestTypeItem } from "./leaderboard-test-type-item";

export const LeaderboardTestTypeSettings = () => {
  return (
    <div className="flex flex-col gap-1">
      {LEADERBOARD_TEST_TYPES.map((testType, index) => (
        <LeaderboardTestTypeItem key={index} testType={testType.testType}>
          {testType.label}
        </LeaderboardTestTypeItem>
      ))}
    </div>
  );
};
