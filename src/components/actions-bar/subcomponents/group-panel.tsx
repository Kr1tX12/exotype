import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export const GroupPanel = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div className={cn("bg-muted/30 h-10 rounded-lg px-4")}>{children}</motion.div>
  );
};
