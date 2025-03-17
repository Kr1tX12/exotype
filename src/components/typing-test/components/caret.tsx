"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const Caret = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleKeyPress = () => {
      setIsVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsVisible(false), 500);
    };

    const handleBlur = () => setIsVisible(false);

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("blur", handleBlur);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute bg-foreground w-[3px] rounded-full h-11 transition-opacity",
        isVisible ? "opacity-100" : "opacity-100",
        className
      )}
      style={{ left: 0, top: 0, ...style }}
      {...props}
    />
  );
});

Caret.displayName = "Caret";
