import { Test, TestRecord } from "@prisma/client";

export const serializeBigint = (value: object) => {
  return JSON.stringify(value, (_, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
};
export const convertTestsBigIntToNumber = (tests: Test[] | TestRecord[]) => {
  return tests?.map(convertTestBigIntToNumber);
};

export const convertTestBigIntToNumber = (test: Test | TestRecord) => {
  return {
    ...test,
    startTestTime: Number(test.startTestTime),
    endTestTime: Number(test.endTestTime),
  };
};


export type ReplaceBigInt<T> = {
  [K in keyof T]: T[K] extends bigint ? number : ReplaceBigInt<T[K]>;
};
