import { WpmChart } from "@/components/ui/wpm-chart";
import React from "react";
import { useTypingPerDay } from "../../../hooks/useTypingPerDay";
import { Skeleton } from "@/components/ui/skeleton";

export const ProfileWpmHistory = () => {
  const { data: typingPerDay, isLoading, error } = useTypingPerDay();

  if (isLoading) {
    return <Skeleton className="w-full h-72" />;
  }

  if (error) {
    return (
      <div className="bg-muted/30 rounded-xl pt-8 pb-2 px-8 w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold">Ашыбка</h1>
        <p className="text-xs text-muted-foreground">{error.message}</p>
      </div>
    );
  }

  if (!typingPerDay) {
    return (
      <div className="bg-muted/30 rounded-xl px-4 size-full ">
        Нет данных
      </div>
    );
  }

  return (
    <div className="bg-muted/30 rounded-xl pt-8 pb-2 px-8 w-full">
      <WpmChart wpmHistory={typingPerDay.map((day) => day.avgWPM)} />
    </div>
  );
};
