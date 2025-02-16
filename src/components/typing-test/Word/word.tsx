import { memo, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/utils";

export const Word = memo(({ 
  children, 
  underlined,
  isLeaving 
}: { 
  children: ReactNode;
  underlined: boolean;
  isLeaving?: boolean;
}) => {
  return (
    <motion.span
      layout
      initial={isLeaving ? { opacity: 1, y: 0 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "inline-block border-b-2 border-transparent",
        underlined && "border-b-red-500"
      )}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.span>
  );
});