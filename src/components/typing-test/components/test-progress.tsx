import { useStore } from "@/store/store";
import { motion } from "framer-motion";
import React, { ComponentProps, forwardRef, useEffect, useState } from "react";

interface TestProgressProps extends ComponentProps<"div"> {
  typedWords: string[];
  needWords: string[];
}
export const TestProgress = forwardRef<HTMLDivElement, TestProgressProps>(
  ({ typedWords, needWords, ...props }, ref) => {
    const [progress, setProgress] = useState(0);

    const startTestTime = useStore((state) => state.startTestTime);
    const { mode, time } = useStore((state) => state.typingParams);

    useEffect(() => {
      if (mode !== "words") return;

      setProgress(((typedWords.length - 1) / needWords.length) * 100);
    }, [typedWords.length, needWords.length, mode]);

    useEffect(() => {
      if (mode !== "time") return;
      if (startTestTime === 0) {
        setProgress(0);
        return;
      }
      
      const updateProgress = () => {
        const passedTime = Date.now() - startTestTime;
        const testDuration = time * 1000;
        setProgress(Math.min((passedTime / testDuration) * 100, 100));
      };
      
      updateProgress(); // Обновляем сразу, чтобы не было задержки
      
      const interval = setInterval(updateProgress, 50);
      return () => clearInterval(interval);
    }, [startTestTime, time, mode]);

    return (
      <div {...props} ref={ref} className="w-full h-3 rounded-full bg-muted">
        <motion.div
          className="bg-primary h-full rounded-full"
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={mode === 'time' ? { duration: 0.05, ease: "linear" } : { duration: 0.3, ease: 'easeInOut'}}
        ></motion.div>
      </div>
    );
  }
);

TestProgress.displayName = "TestProgress";