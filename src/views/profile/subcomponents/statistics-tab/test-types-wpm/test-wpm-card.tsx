import { ReplaceBigIntRecordTest } from "@/entities/test/test.model";
import { cn } from "@/shared/lib/utils";
import { generateDbTestStats } from "@/shared/lib/utils/db-test-stats-generator";
import { TestType } from "@prisma/client";

export const TestWpmCard = ({
  record,
  testType,
  testValue,
}: {
  record: ReplaceBigIntRecordTest | undefined;
  testType: TestType;
  testValue: number;
}) => {
  const label = {
    WORDS: "WORDS",
    TIME: "SECONDS",
    AI: "SENTENCES",
    FREE: null,
    CUSTOM: null,
    TEXT: null,
  }[testType];

  if (!record) {
    return (
      <div className="flex flex-col bg-muted/30 rounded-xl h-24 w-40 py-4 px-2 items-center justify-center">
        <p className="uppercase font-bold text-xs text-muted-foreground">
          {testValue} {label}
        </p>
        <h3 className={cn("text-4xl font-medium text-primary font-goblin-one")}>
          0
        </h3>
        <p className="text-xs text-muted-foreground">WPM</p>
      </div>
    );
  }

  const { wpm } = generateDbTestStats(record);
  return (
    <div className="flex flex-col bg-muted/30 rounded-xl h-24 w-40 py-4 px-2 items-center justify-center">
      <p className="uppercase font-bold text-xs text-muted-foreground">
        {record.testValue} {label}
      </p>
      <h3
        className={cn(
          "text-4xl translate-y-0.5 font-medium text-primary font-goblin-one"
        )}
      >
        {Math.round(wpm)}
      </h3>
      <p className="text-xs text-muted-foreground">WPM</p>
    </div>
  );
};
