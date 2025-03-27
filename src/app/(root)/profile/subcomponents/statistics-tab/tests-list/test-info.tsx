import { BookOpenIcon } from "lucide-react";
import { useMemo } from "react";
import { TextInfoStat } from "./text-info-stat";
import { Badge } from "@/components/ui/badge";
import { Test } from "@prisma/client";
import { generateDbTestStats } from "@/lib/utils/db-test-stats-generator";
import { getTestDifficulty } from "@/lib/utils/getTestDifficulty";
import { IconBrain, IconCircleLetterW, IconClock } from "@tabler/icons-react";
import { TimeAgoText } from "./time-ago-text";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TypedText } from "./typed-text";

export const TestInfo = ({ test }: { test: Test }) => {
  const { wpm, rawWpm, accuracy, mistakes } = useMemo(
    () => generateDbTestStats(test),
    [test]
  );

  const {
    testValue,
    testType,
    punctuation,
    dictionary,
    startTestTime,
    typedText,
    targetText,
  } = test;
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
  }[testType];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-muted/30 rounded-xl flex px-4 max-md:px-2 py-3 max-md:py-1.5 gap-4 max-md:gap-2 justify-between items-center text-muted-foreground hover:bg-muted/50 cursor-pointer transition-colors">
          <div className="flex gap-3 font-medium items-center">
            <div className="flex flex-col items-center">
              <Icon  />
              <p className="text-xs text-muted-foreground leading-[0.5rem]">
                {testValue}
              </p>
            </div>
            <div className="flex flex-col gap-1 items-start">
              <p className="text-sm truncate">
                <TimeAgoText ms={Number(startTestTime)} />
              </p>
              <Badge
                variant={
                  difficulty < 60
                    ? "easy"
                    : difficulty < 1000
                    ? "medium"
                    : "hard"
                }
                className="max-md:text-[0.55rem]"
              >
                Сложность {difficulty}
              </Badge>
            </div>
          </div>

          <div className="flex gap-6 max-md:gap-3 justify-self-end">
            <TextInfoStat value={wpm} label="WPM" />
            <TextInfoStat value={rawWpm} label="Raw WPM" />
            <TextInfoStat value={accuracy} label="Acc" />
            <TextInfoStat value={mistakes} label="Mis" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Тест 12</DialogTitle>
        <TypedText typedText={typedText} targetText={targetText} />
      </DialogContent>
    </Dialog>
  );
};
