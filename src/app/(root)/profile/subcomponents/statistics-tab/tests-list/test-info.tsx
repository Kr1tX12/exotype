import { BookOpenIcon } from "lucide-react";
import React from "react";
import { TextInfoStat } from "./text-info-stat";
import { Badge } from "@/components/ui/badge";
import { getRandomArrayElement } from "@/lib/utils";

export const TestInfo = () => {
  return (
    <div className="bg-muted/30 rounded-xl flex px-4 py-3 gap-4 justify-between items-center text-muted-foreground">
      <div className="flex gap-3 font-medium items-center">
        <BookOpenIcon />
        <div className="flex flex-col gap-1">
          <p className="text-sm truncate">15 секунд</p>
          <Badge variant={getRandomArrayElement(["hard", 'medium', 'easy'])}>Сложность 83</Badge>
        </div>
      </div>

      <div className="flex gap-6 justify-self-end">
        <TextInfoStat value={184} label="WPM" />
        <TextInfoStat value={"98%"} label="Acc" />
        <TextInfoStat value={2} label="Mis" />
        <TextInfoStat value={184} label="WPM" />
      </div>
    </div>
  );
};
