import { memo } from "react";
import { useStats } from "../hooks/subhooks/useStats";
import { HideOnTyping } from "@/shared/components/hide-on-typing";

export const StatsDisplayer = memo(() => {
  const { wpm } = useStats();
  return (
    <>
      <HideOnTyping reverse className="flex gap-4">
        <div className="flex flex-col items-center leading-none text-primary">
          <p className="text-3xl font-medium">{wpm}</p>
        </div>
      </HideOnTyping>
    </>
  );
});

StatsDisplayer.displayName = "StatsDisplayer";
