"use client";

import React, { HTMLProps, memo, RefObject } from "react";
import { cn } from "@/shared/lib/utils";
import { useCaretPulse } from "../hooks/subhooks/useCaretPulse";
import { useCaretWithPartialText } from "../hooks/subhooks/useCaretWithPartialText";

interface CaretProps extends HTMLProps<HTMLDivElement> {
  containerRef: RefObject<HTMLDivElement | null>;
  caretRef: RefObject<HTMLDivElement | null>;
}
export const Caret = memo(
  React.forwardRef<HTMLDivElement, CaretProps>(
    ({ className, containerRef, caretRef, ...props }, ref) => {
      const isPulsing = useCaretPulse(1000);
      useCaretWithPartialText({ containerRef, caretRef });


      return (
        <div
          ref={ref}
          className={cn(
            "absolute bg-caret w-[4px] rounded-full h-11 transition-opacity duration-1000 left-0 top-0",
            isPulsing && "animate-pulse",
            className
          )}
          {...props}
        />
      );
    }
  )
);

Caret.displayName = "Caret";
