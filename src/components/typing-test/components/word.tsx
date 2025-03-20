import { memo, ReactNode, useLayoutEffect, useRef, useState } from "react";
import { motion, usePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const baseTransition = { duration: 0.2, ease: "easeInOut" };

const wordVariants = {
  initial: { y: 0, opacity: 1 },
  exit: {
    y: -40,
    opacity: 0,
    transition: baseTransition,
  },
};

export const Word = memo(
  ({
    children,
    animate,
    dataIndex,
  }: {
    children: ReactNode;
    animate: boolean;
    dataIndex: number;
  }) => {
    const wordRef = useRef<HTMLSpanElement>(null);
    const [absolutePosition, setAbsolutePosition] = useState<{
      left: number;
      top: number;
    } | null>(null);
    const [isPresent, safeToRemove] = usePresence();

    useLayoutEffect(() => {
      if (!isPresent && wordRef.current) {
        const parent = wordRef.current.offsetParent as HTMLElement;
        if (parent) {
          const parentRect = parent.getBoundingClientRect();
          const wordRect = wordRef.current.getBoundingClientRect();
          setAbsolutePosition({
            left: wordRect.left - parentRect.left,
            top: wordRect.top - parentRect.top,
          });
        }
      }
    }, [isPresent]);

    return (
      <motion.span
        data-word-index={dataIndex}
        ref={wordRef}
        variants={wordVariants}
        exit="exit"
        onAnimationComplete={() => {
          if (!isPresent) safeToRemove(); // Удаляем элемент из DOM после анимации
        }}
        className={cn("inline-block transition-colors")}
        layout={animate}
        style={
          !isPresent && absolutePosition
            ? {
                position: "absolute",
                left: absolutePosition.left,
                top: absolutePosition.top,
              }
            : undefined
        }
      >
        {children}
      </motion.span>
    );
  }
);

Word.displayName = "Word";
