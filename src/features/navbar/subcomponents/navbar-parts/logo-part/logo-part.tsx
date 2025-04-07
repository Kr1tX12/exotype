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
        className={cn(
          isTyping
            ? "text-foreground"
            : "text-colorful drop-shadow-[0px_0px_8px_hsl(var(--colorful)_/_0.3)]"
        )}
        size={38}
        fill={isTyping ? "hsl(var(--foreground))" : "hsl(var(--colorful))"}
      />
      <div className="flex flex-col ">
        <TypingEffect
          typedTextClassName={cn(
            isTyping
              ? "text-foreground"
              : "text-primary [text-shadow:0px_0px_8px_hsl(var(--primary)_/_0.3)]",
            "font-goblin-one"
          )}
          caretClassName={isTyping ? "bg-foreground" : "bg-primary"}
          targetTextClassName={cn(
            isTyping ? "text-foreground/50" : "text-primary/50",
            "font-goblin-one"
          )}
          typeSpeed={120}
          typing={isHover}
          initialIndex={3}
        >
          exotype
        </TypingEffect>
      </div>
    </Link>
  );
};
