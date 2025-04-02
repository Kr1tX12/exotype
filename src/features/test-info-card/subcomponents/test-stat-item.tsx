import React from "react";

export const TestStatItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="flex gap-0.5 items-end">
      <p className="text-xl max-md:text-lg text-foreground leading-none font-semibold">
        {value}
      </p>
      <p className="text-[0.6rem] max-md:text-[0.5rem] leading-none text-muted-foreground">
        {label}
      </p>
    </div>
  );
};
