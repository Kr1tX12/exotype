import { LeaderboardHeader } from "./subcomponents/header/leaderboard-header";
import { LeaderboardLanguagePicker } from "./subcomponents/leaderboard-language-picker/leaderboard-language-picker";
import { LeaderboardContent } from "./subcomponents/content/leaderboard-content";

export const Leaderboard = () => {
  return (
    <div className="sm:container">
      <div className="bg-muted/30 sm:rounded-xl px-8 py-4">
        <div className="flex flex-col">
          <LeaderboardHeader />
          <div className="flex gap-4">
            <LeaderboardLanguagePicker />
            <LeaderboardContent testType={"WORDS"} testValue={10} />
          </div>
        </div>
      </div>
    </div>
  );
};
