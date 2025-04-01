import React from "react";
import { TestWpmCard } from "./test-wpm-card";
import { useTestRecords } from "../../../hooks/useTestRecords";
import { Skeleton } from "@/components/ui/skeleton";
import { TestRecord, TestType } from "@prisma/client";
import { ReplaceBigInt } from "@/lib/utils/bigint-utils";

export const TestTypesWpmCards = () => {
  const { data: records, isLoading, error } = useTestRecords();

  if (isLoading) {
    return (
      <div className="grid grid-cols-6 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4 origin-top">
        {[0, 1, 2, 4, 5, 6].map((elem, index) => (
          <Skeleton className="h-24 w-40" key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid place-content-center text-3xl font-semibold">
        Не удалось загрузить рекорды
      </div>
    );
  }

  const recordsToShow: {
    record: ReplaceBigInt<TestRecord> | undefined;
    testType: TestType;
    testValue: number;
  }[] = [
    {
      record: records?.find(
        (record) => record.testType === "TIME" && record.testValue === 15
      ),
      testType: "TIME",
      testValue: 15,
    },
    {
      record: records?.find(
        (record) => record.testType === "TIME" && record.testValue === 60
      ),
      testType: "TIME",
      testValue: 60,
    },
    {
      record: records?.find(
        (record) => record.testType === "WORDS" && record.testValue === 10
      ),
      testType: "WORDS",
      testValue: 10,
    },
    {
      record: records?.find(
        (record) => record.testType === "WORDS" && record.testValue === 100
      ),
      testType: "WORDS",
      testValue: 100,
    },
    {
      record: records?.find(
        (record) => record.testType === "AI" && record.testValue === 2
      ),
      testType: "AI",
      testValue: 2,
    },
    {
      record: records?.find(
        (record) => record.testType === "AI" && record.testValue === 5
      ),
      testType: "AI",
      testValue: 5,
    },
  ];

  return (
    <div className="grid grid-cols-6 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4 origin-top">
      {recordsToShow.map((record, index) => {
        return (
          <TestWpmCard
            key={index}
            record={record.record}
            testType={record.testType}
            testValue={record.testValue}
          />
        );
      })}
    </div>
  );
};
