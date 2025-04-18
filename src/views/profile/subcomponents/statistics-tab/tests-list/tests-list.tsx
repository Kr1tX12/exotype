import { useQuery } from "@tanstack/react-query";
import { TestInfo } from "./test-info";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TestAPI } from "@/entities/test/test.api";

export const TestsList = () => {
  const { data: tests, isLoading, error } = useQuery(TestAPI.getLastTestsQueryOptions());

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
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-semibold">Ашыбка</h1>
        <p className="text-muted-foreground">
          {error?.message ?? "Здесь могло быть сообщение об ошибке..."}
        </p>
      </div>
    );
  }

  if (!tests || tests.length === 0) {
    return (
      <div className="size-full grid place-content-center bg-muted/30 rounded-xl text-3xl font-semibold">
        Нет тестов
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 overflow-y-auto pr-4 h-72">
      {tests.map((test, index) => (
        <TestInfo test={test} key={index} />
      ))}
    </div>
  );
};
