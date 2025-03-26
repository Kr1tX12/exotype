import React from "react";

export const TextInfoStat = ({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-xl text-foreground leading-none font-semibold">{value}</p>
      <p className="text-xs leading-none">{label}</p>
    </div>
  );
};
