import { UserDto } from "@/entities/user/user.model";
import { ProfileLeaderboardPosition } from "./profile-leaderboard-position";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TestType } from "@prisma/client";

export const ProfileLeaderboardPositions = ({ user }: { user?: UserDto }) => {
  if (!user) {
    return (
      <div className="flex gap-4 overflow-x-visible">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="w-40 h-24" />
        ))}
      </div>
    );
  }

  const ranks = [];

  const stats = user.stats;
  const rankData: { rank: number; testType: TestType; testValue: number }[] = [
    { rank: stats?.rank15time ?? -1, testType: "TIME", testValue: 15 },
    { rank: stats?.rank60time ?? -1, testType: "TIME", testValue: 60 },
    { rank: stats?.rank10words ?? -1, testType: "WORDS", testValue: 10 },
    { rank: stats?.rank500words ?? -1, testType: "WORDS", testValue: 500 },
  ];

  rankData.forEach(({ rank, testType, testValue }) => {
    if (rank !== -1) {
      ranks.push({ rank, testType, testValue });
    }
  });

  return (
    <div className="flex gap-4 overflow-x-visible">
      {rankData.map((rankData, index) => (
        <ProfileLeaderboardPosition
          rank={rankData.rank}
          testType={rankData.testType}
          testValue={rankData.testValue}
          key={index}
        />
      ))}
    </div>
  );
};
