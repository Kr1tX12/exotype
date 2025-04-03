"use client";

import { CacheLeaderboardEntry } from "@/app/api/leaderboard/leaderboard.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TextInfoStat } from "@/components/ui/text-info-stat";
import { TimeAgoText } from "@/components/ui/time-ago-text";
import { TestInfoCard } from "@/features/test-info-card";
import { cn } from "@/lib/utils";
import { generateDbTestStats } from "@/lib/utils/db-test-stats-generator";

export const LeaderboardEntry = ({
  leaderboardEntry,
  place,
  className,
}: {
  leaderboardEntry: CacheLeaderboardEntry;
  place: number;
  className?: string;
}) => {
  const { test, user } = leaderboardEntry;

  const { wpm, accuracy, consistency, wordsTyped } = generateDbTestStats(test);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={cn(
            "rounded-xl px-8 py-4 flex gap-2 items-center w-full justify-between cursor-pointer hover:scale-[.99] transition-all h-20",
            className
          )}
        >
          <div className="flex gap-4 items-center">
            <h3 className="text-xl font-semibold">{place}</h3>
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage
                  src={user?.avatar ?? undefined}
                  alt={
                    user?.username ? `${user?.username} avatar` : "User avatar"
                  }
                />
                <AvatarFallback>{user.username?.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h3 className="font-semibold leading-none text-xl">
                  {user?.username}
                </h3>
                <p className="text-muted-foreground text-xs leading-4">
                  Побит <TimeAgoText ms={test.endTestTime} />
                </p>
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
      </DialogTrigger>
      <DialogContent className="block">
        <DialogHeader>
          <DialogTitle hidden>{user.username}&apos;s record</DialogTitle>
          <DialogDescription hidden>{test.typedText}</DialogDescription>
        </DialogHeader>
        <TestInfoCard test={test} user={user} />
      </DialogContent>
    </Dialog>
  );
};
