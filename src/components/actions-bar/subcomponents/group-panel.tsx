import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const GroupPanel = ({ children }: { children: ReactNode }) => {
  return (
    <div className={cn("bg-muted/30 h-12 rounded-xl px-4")}>{children}</div>
  );
};
