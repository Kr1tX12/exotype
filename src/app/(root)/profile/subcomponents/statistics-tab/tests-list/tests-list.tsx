import { Test } from "@prisma/client";
import { useLastUserTests } from "../../../hooks/useLastUserTests";
import { TestInfo } from "./test-info";
import { Skeleton } from "@/components/ui/skeleton";

export const TestsList = () => {
  const { data: tests, isLoading, error } = useLastUserTests();

  console.log(tests);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 h-72 px-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton className="w-full h-full" key={index} />
        ))}
      </div>
    );
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="grid gap-2">
      <div className="justify-self-end">
        <span className="text-muted-foreground">Всего:</span> <span className="font-semibold">{tests.length}</span>
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto h-72 pr-4">
        {tests.map((test: Test, index: number) => (
          <TestInfo test={test} key={index} />
        ))}
      </div>
    </div>
  );
};
