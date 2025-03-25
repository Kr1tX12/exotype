import { cn } from "@/lib/utils";
import React from "react";

export const GradientTransition = ({
  direction,
  className,
}: {
  direction: "top" | "bottom";
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "sticky left-0 w-full h-12 from-background to-transparent",
        direction === "top"
          ? "top-0 bg-gradient-to-b"
          : "bottom-0 bg-gradient-to-t",
        className
      )}
    />
  );
};
