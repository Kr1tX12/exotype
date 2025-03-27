import { BookOpenIcon } from "lucide-react";
import { useMemo } from "react";
import { TextInfoStat } from "./text-info-stat";
import { Badge } from "@/components/ui/badge";
import { timeAgo } from "@/lib/utils";
import { Test } from "@prisma/client";
import { generateDbTestStats } from "@/lib/utils/db-test-stats-generator";
import { getTestDifficulty } from "@/lib/utils/getTestDifficulty";
import { IconBrain, IconCircleLetterW, IconClock } from "@tabler/icons-react";

export const TestInfo = ({ test }: { test: Test }) => {
  const { wpm, rawWpm, accuracy, mistakes } = useMemo(
    () => generateDbTestStats(test),
    [test]
  );

  const { testValue, testType, punctuation, dictionary, startTestTime } = test;
  const difficulty = getTestDifficulty({
    testType,
    testValue,
    punctuation,
    dictionary,
  });

  const Icon = {
    WORDS: IconCircleLetterW,
    TIME: IconClock,
    AI: IconBrain,
    TEXT: BookOpenIcon,
    FREE: BookOpenIcon,
  }[testType]

  return (
    <div className="bg-muted/30 rounded-xl flex px-4 py-3 gap-4 justify-between items-center text-muted-foreground">
      <div className="flex gap-3 font-medium items-center">
        <Icon />
        <div className="flex flex-col gap-1 items-start">
          <p className="text-sm truncate">
            {test.testType} - {test.testValue} - {timeAgo(Number(startTestTime))}
          </p>
          <Badge variant={difficulty < 60 ? 'easy' : difficulty < 100 ? 'medium' : 'hard'}>
            Сложность {difficulty}
          </Badge>
        </div>
      </div>

      <div className="flex gap-6 justify-self-end">
        <TextInfoStat value={wpm} label="WPM" />
        <TextInfoStat value={rawWpm} label="Raw WPM" />
        <TextInfoStat value={accuracy} label="Acc" />
        <TextInfoStat value={mistakes} label="Mis" />
      </div>
    </div>
  );
};
