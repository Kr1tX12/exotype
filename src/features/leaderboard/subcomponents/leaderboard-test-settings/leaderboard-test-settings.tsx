import { LeaderboardTestTypeSettings } from "./test-type-settings/leaderboard-test-type-settings";
import { LeaderboardTestValueSettings } from "./test-value-settings/leaderboard-test-value-settings";

export const LeaderboardLanguagePicker = () => {
  return (
    <div className="flex flex-col gap-8">
      <LeaderboardTestTypeSettings />
      <LeaderboardTestValueSettings />
    </div>
  );
};
