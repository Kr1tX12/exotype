"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useCaretPulse } from "../hooks/subhooks/useCaretPulse";

export const Caret = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
  const isPulsing = useCaretPulse(1000);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute bg-caret w-[4px] rounded-full h-11 transition-opacity duration-1000",
        isPulsing && "animate-pulse",
        className
      )}
      style={{ left: 0, top: 0, ...style }}
      {...props}
    />
  );
});

Caret.displayName = "Caret";
