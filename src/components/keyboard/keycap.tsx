import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type KeycapProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
  shiftValue?: string;
};

export const Keycap = ({
  value,
  shiftValue,
  className,
  ...rest
}: KeycapProps) => {
  return (
    <div
      {...rest}
      className={cn(
        "bg-muted/40 rounded-lg overflow-hidden relative", // используем меньший радиус и overflow-hidden
        className
      )}
    >
      {/* Основной символ в верхнем левом углу */}
      <span
        className={cn(
          "absolute top-0 left-0.5 z-10",
          shiftValue || "size-full flex justify-center items-center left-0"
        )}
      >
        {value}
      </span>
      {shiftValue && (
        // Дополнительный символ (ShiftValue) в нижнем правом углу
        <span className="absolute bottom-0 right-0.5 text-xs text-foreground/50 z-10">
          {shiftValue}
        </span>
      )}
    </div>
  );
};
