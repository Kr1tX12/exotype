import { cn } from "@/lib/utils";
import React from "react";

export const TestWpmCard = () => {
  const wpm = (Math.random() * 150 + 50).toFixed(1);
  return (
    <div className="flex flex-col bg-muted/30 rounded-xl h-24 w-40 py-4 px-2 items-center justify-center">
      <p className="uppercase font-bold text-xs text-muted-foreground">15s</p>
      <h3 className={cn("text-4xl font-medium text-primary")}>{wpm}</h3>
      <p className="text-xs text-muted-foreground">WPM</p>
    </div>
  );
};
