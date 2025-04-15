import { HTMLMotionProps, motion } from "framer-motion";
import { forwardRef, memo } from "react";
import { useTestProgress } from "../hooks/subhooks/useTestProgress";
import { useIsTyping } from "@/shared/hooks/useIsTyping";

export const TestProgress = memo(
  forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(({ ...props }, ref) => {
    const { progress, transition } = useTestProgress();
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
  })
);

TestProgress.displayName = "TestProgress";
