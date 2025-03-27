import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import ActivityCalendar from "react-activity-calendar";

export const ProfileActivityCalendar = () => {
  return (
    <div className="bg-muted/30 rounded-xl px-8 py-8">
      <ActivityCalendar
        blockSize={20}
        data={[
          {
            date: "2024-11-29",
            count: 2,
            level: 1,
          },
          {
            date: "2024-12-01",
            count: 16,
            level: 4,
          },
          {
            date: "2025-11-29",
            count: 11,
            level: 3,
          },
        ]}
        renderBlock={(block, activity) => (
          <TooltipProvider delayDuration={100} disableHoverableContent>
            <Tooltip disableHoverableContent>
              <TooltipTrigger asChild>{block}</TooltipTrigger>
              <TooltipContent>
                {`${activity.count} tests on ${activity.date}`}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        renderColorLegend={(block, level) => (
          <TooltipProvider disableHoverableContent>
            <Tooltip>
              <TooltipTrigger>{block}</TooltipTrigger>
              <TooltipContent>{`Level ${level}`}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        theme={{
          dark: [
            "hsl(var(--primary) / .05)",
            "hsl(var(--primary) / .4)",
            "hsl(var(--primary) / .6)",
            "hsl(var(--primary) / .8)",
            "hsl(var(--primary))",
          ],
        }}
        blockRadius={5}
        blockMargin={5}
      />
    </div>
  );
};
