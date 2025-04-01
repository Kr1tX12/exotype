import { CacheLeaderboardEntry } from "@/app/api/leaderboard/leaderboard.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TextInfoStat } from "@/components/ui/text-info-stat";
import { generateDbTestStats } from "@/lib/utils/db-test-stats-generator";

export const LeaderboardEntry = ({
  leaderboardEntry,
}: {
  leaderboardEntry: CacheLeaderboardEntry;
}) => {
  const { test, user } = leaderboardEntry;

  const { wpm, accuracy, consistency, wordsTyped } = generateDbTestStats(test);

  return (
    <div className="bg-muted/30 rounded-xl px-8 py-4 flex gap-2 items-center w-full justify-between">
      <div className="flex gap-4 items-center">
        <h3 className="text-xl font-semibold">1</h3>
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage
              src={user?.avatar ?? undefined}
              alt={user?.username ? `${user?.username} avatar` : "User avatar"}
            />
            <AvatarFallback>{user?.username.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="font-semibold">{user?.username}</h3>
          </div>
        </div>
      </div>

      <div className="flex gap-8 items-center">
        <TextInfoStat label="WPM" value={Math.round(wpm)} />
        <TextInfoStat label="Acc" value={accuracy} />
        <TextInfoStat label="Consistency" value={consistency} />
        <TextInfoStat label="Words" value={wordsTyped} />
      </div>
    </div>
  );
};
