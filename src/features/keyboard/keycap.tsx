import React, { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils";

type KeycapProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
  shiftValue?: string;
};

export const Keycap = ({ value, className, ...rest }: KeycapProps) => {
  return (
    <div
      {...rest}
      className={cn(
        "bg-muted/40 rounded-lg flex justify-center items-center", // используем меньший радиус и overflow-hidden
        className
      )}
    >
      {value}
    </div>
  );
};
