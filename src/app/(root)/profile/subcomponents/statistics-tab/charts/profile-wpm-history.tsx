import { WpmChart } from "@/components/ui/wpm-chart";
import React from "react";

export const ProfileWpmHistory = () => {
  return (
    <div className="bg-muted/30 rounded-xl pt-8 pb-2 px-8 w-full">
      <WpmChart
        wpmHistory={[
          20, 22, 21, 24, 32, 31, 36, 54, 58, 55, 69, 63, 65, 68, 70, 69, 82,
        ]}
      />
    </div>
  );
};
