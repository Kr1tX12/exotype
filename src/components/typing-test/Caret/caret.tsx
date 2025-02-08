"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

export const Caret = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [isUserTyping, setUserTyping] = useState(false);

  useEffect(() => {
    const handleKeyUp = () => {
      setUserTyping(true);

      const timeout = setTimeout(() => {
        setUserTyping(false);
      }, 1000);

      return () => clearTimeout(timeout);
    };

    const handleKeyDown = () => {
      setUserTyping(true);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute bg-foreground w-[2px] rounded-full h-10",
        isUserTyping || "animate-pulse"
      )}
      style={{ left: 0, top: 0 }}
      {...props}
    />
  );
});