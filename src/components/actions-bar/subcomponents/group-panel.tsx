import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const GroupPanel = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("bg-muted/30 h-12 rounded-xl px-4", className)}>
      {children}
    </div>
  );
};
