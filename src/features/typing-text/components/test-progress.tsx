import { HTMLMotionProps, motion } from "framer-motion";
import { forwardRef } from "react";
import { useTestProgress } from "../hooks/subhooks/useTestProgress";
import { useIsTyping } from "@/hooks/useIsTyping";

interface TestProgressProps extends HTMLMotionProps<"div"> {
  typedWords: string[];
  targetWords: string[];
}
export const TestProgress = forwardRef<HTMLDivElement, TestProgressProps>(
  ({ typedWords, targetWords, ...props }, ref) => {
    const { progress, transition } = useTestProgress({
      typedWords,
      targetWords,
    });
    const isTyping = useIsTyping();

    return (
      <motion.div
        {...props}
        ref={ref}
        animate={{ opacity: isTyping ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        className="w-full h-3 max-md:h-2 rounded-full bg-muted overflow-hidden"
      >
        <motion.div
          className="bg-progress-bar h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={transition}
        />
      </motion.div>
    );
  }
);

TestProgress.displayName = "TestProgress";
