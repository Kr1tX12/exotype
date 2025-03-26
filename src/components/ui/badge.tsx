import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-background shadow",
        secondary: "border-transparent bg-muted text-muted-foreground",
        hard: "border-transparent bg-red-500/20 text-red-500 shadow shadow-red-500/20",
        medium:
          "border-transparent bg-orange-500/20 text-orange-500 shadow shadow-orange-500/20",
        easy: "border-transparent bg-green-500/20 text-green-500 shadow shadow-green-500/20",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
