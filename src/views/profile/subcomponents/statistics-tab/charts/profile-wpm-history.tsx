import { WpmChart } from "@/shared/components/ui/wpm-chart";
import React from "react";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { TypingPerDayAPI } from "@/entities/typing-per-day/typing-per-day.api";

export const ProfileWpmHistory = () => {
  const {
    data: typingPerDay,
    isLoading,
    error,
  } = useQuery(TypingPerDayAPI.getTypingPerDayQueryOptions());

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
      <div className="bg-muted/30 rounded-xl px-4 size-full ">Нет данных</div>
    );
  }

  return (
    <div className="bg-muted/30 rounded-xl py-2 pb-4 w-full h-full">
      <WpmChart
        label="день"
        wpmHistory={typingPerDay.map((day) => day.avgWPM)}
      />
    </div>
  );
};
