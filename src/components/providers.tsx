"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import { ThemeProvider } from "./theme-provider";

export const Providers = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    window.yaContextCb.push(() => {
      Ya.Context.AdvManager.render({
        blockId: "R-A-14560878-2",
        type: "floorAd",
        platform: "desktop",
      });
    });
  });

  
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
};
