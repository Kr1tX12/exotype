import { LeaderboardHeader } from "./subcomponents/header/leaderboard-header";
import { LeaderboardLanguagePicker } from "./subcomponents/leaderboard-language-picker/leaderboard-language-picker";
import { LeaderboardContent } from "./subcomponents/content/leaderboard-content";
import { cn } from "@/lib/utils";

export const Leaderboard = ({ isModal = false }: { isModal?: boolean }) => {
  return (
    <div className={cn(isModal || "sm:container")}>
      <div className={cn("sm:rounded-xl px-8 py-4", isModal || "bg-muted/30")}>
        <div className="flex flex-col gap-8">
          <LeaderboardHeader />
          <div className="flex gap-8">
            <LeaderboardLanguagePicker />
            <LeaderboardContent testType={"WORDS"} testValue={10} />
          </div>
        </div>
      </div>
    </div>
  );
};
