export const serializeBigint = (value: object) => {
  return JSON.stringify(value, (_, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
};

export type ReplaceBigInt<T> = {
  [K in keyof T]: T[K] extends bigint ? number : ReplaceBigInt<T[K]>
}
