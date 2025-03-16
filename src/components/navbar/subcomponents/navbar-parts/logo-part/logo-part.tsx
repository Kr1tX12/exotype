'use client';

import { TypingEffect } from "@/components/ui/typing-effect";
import { Zap } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export const LogoPart = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link
      href="/"
      className="flex gap-1 items-center justify-self-center max-md:justify-self-start"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Zap size={32} />
      <div className="flex flex-col ">
        <TypingEffect typeSpeed={120} typing={isHover} initialIndex={3}>exotype</TypingEffect>
        <p className="text-muted-foreground text-[10px] text-nowrap -translate-y-1 ml-px">
          преодолей пределы печати
        </p>
      </div>
    </Link>
  );
};
