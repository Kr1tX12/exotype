export const serializeBigint = (value: object) => {
  return JSON.stringify(value, (_, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
};
