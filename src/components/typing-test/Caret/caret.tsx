"use client";

import { cn } from "@/lib/utils/utils";
import React, { useEffect, useRef, useState } from "react";

export const Caret = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleKeyPress = () => {
      setIsVisible(true);
      const timeout = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timeout);
    };

    const handleBlur = () => setIsVisible(false);
    
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('blur', handleBlur);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute bg-foreground w-[2px] rounded-full h-10 transition-opacity",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      style={{ left: 0, top: 0 }}
      {...props}
    />
  );
});