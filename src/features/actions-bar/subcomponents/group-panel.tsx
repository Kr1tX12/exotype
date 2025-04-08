import { cn } from "@/shared/lib/utils";
import { ReactNode } from "react";

export const GroupPanel = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("bg-muted/50 h-14 rounded-xl px-4", className)}>
      {children}
    </div>
  );
};
