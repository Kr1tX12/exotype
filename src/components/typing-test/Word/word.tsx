import { memo, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/utils";

export const Word = memo(
  ({
    children,
    underlined,
    isLeaving,
  }: {
    children: ReactNode;
    underlined: boolean;
    isLeaving?: boolean;
  }) => {
    return (
      <motion.span
        layout
        initial={isLeaving ? { opacity: 1, y: 0 } : false}
        animate={isLeaving ? { opacity: 1, y: 0 } : false}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={cn(
          "inline-block border-b-2 border-transparent",
          underlined && "border-b-red-500"
        )}
      >
        {children}
      </motion.span>
    );
  }
);
