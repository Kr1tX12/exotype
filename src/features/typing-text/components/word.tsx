import { memo, ReactNode, useRef } from "react";
import { motion, usePresence } from "framer-motion";
import { cn } from "@/shared/lib/utils";

const baseTransition = { duration: 0.2, ease: "easeInOut" };

const wordVariants = {
  initial: { y: 0, opacity: 1 },
  exit: {
    y: -40,
    opacity: 0,
    transition: baseTransition,
  },
};

interface WordProps {
  children: ReactNode;
  animate: boolean;
  dataIndex: number;
}
export const Word = memo(({ children, animate, dataIndex }: WordProps) => {
  console.log('word rerender')
  return animate ? (
    <AnimatedWord dataIndex={dataIndex}>{children}</AnimatedWord>
  ) : (
    <NoAnimationWord dataIndex={dataIndex}>{children}</NoAnimationWord>
  );
});

type RealWordProps = Omit<WordProps, "animate">;
const AnimatedWord = ({ children, dataIndex }: RealWordProps) => {
  const wordRef = useRef<HTMLSpanElement>(null);
  const [isPresent, safeToRemove] = usePresence();

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
      layout
    >
      {children}
    </motion.span>
  );
};

const NoAnimationWord = ({ children, dataIndex }: RealWordProps) => {
  return (
    <span
      data-word-index={dataIndex}
      className={cn("inline-block transition-colors")}
    >
      {children}
    </span>
  );
};

Word.displayName = "Word";
