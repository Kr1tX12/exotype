import { motion } from "framer-motion";
import { ComponentProps, forwardRef } from "react";
import { useTestProgress } from "../hooks/subhooks/useTestProgress";

interface TestProgressProps extends ComponentProps<"div"> {
  typedWords: string[];
  targetWords: string[];
}
export const TestProgress = forwardRef<HTMLDivElement, TestProgressProps>(
  ({ typedWords, targetWords, ...props }, ref) => {
    const { progress, transition } = useTestProgress({
      typedWords,
      targetWords,
    });

    return (
      <div
        {...props}
        ref={ref}
        className="w-full h-3 rounded-full bg-muted/50 overflow-hidden"
      >
        <motion.div
          className="bg-primary h-full rounded-full"
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={transition}
        />
      </div>
    );
  }
);

TestProgress.displayName = "TestProgress";
