"use client";

import { TypingEffect } from "@/shared/components/ui/typing-effect";
import { useIsTyping } from "@/shared/hooks/useIsTyping";
import { cn } from "@/shared/lib/utils";
import { Zap } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export const LogoPart = () => {
  const [isHover, setIsHover] = useState(false);
  const isTyping = useIsTyping();

  return (
    <Link
      href="/"
      className="flex gap-1 items-center justify-self-center max-md:justify-self-start max-md:scale-75 origin-left"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Zap
        className={cn(isTyping ? "text-foreground" : "text-colorful")}
        size={32}
      />
      <div className="flex flex-col leading-7 translate-y-1">
        <TypingEffect
          typedTextClassName={isTyping ? "text-foreground" : "text-primary"}
          caretClassName={isTyping ? "bg-foreground" : "bg-primary"}
          targetTextClassName={
            isTyping ? "text-foreground/50" : "text-primary/50"
          }
          typeSpeed={120}
          typing={isHover}
          initialIndex={3}
        >
          exotype
        </TypingEffect>
        <p className="text-muted-foreground text-[10px] text-nowrap ml-px">
          преодолей пределы печати
        </p>
      </div>
    </Link>
  );
};
