"use client";

import { useIsTyping } from "@/shared/hooks/useIsTyping";
import { cn } from "@/shared/lib/utils";
import React, { ReactNode } from "react";

export const NavbarContainer = ({ children }: { children: ReactNode }) => {
  const isTyping = useIsTyping();

  return (
    <header className="sm:container gap-4">
      <nav
        className={cn(
          "grid grid-cols-3 max-md:grid-cols-2 gap-8 justify-between items-center sm:rounded-xl h-20 my-6 px-6 transition-colors",
          isTyping || "bg-muted/50"
        )}
      >
        {children}
      </nav>
    </header>
  );
};
