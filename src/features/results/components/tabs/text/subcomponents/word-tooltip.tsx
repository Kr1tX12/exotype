import { WordStat } from "@/shared/lib/utils/test-stats-generator";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, RefObject, SetStateAction } from "react";

export const WordTooltip = ({
  tooltipContent,
  tooltipRef,
  hoveredWord,
  tooltipPosition,
  setTooltipContent,
}: {
  tooltipContent: WordStat | null;
  tooltipRef: RefObject<HTMLDivElement | null>;
  hoveredWord: {
    word: WordStat;
    rect: DOMRect;
  } | null;
  tooltipPosition: {
    top: number;
    left: number;
  };
  setTooltipContent: Dispatch<SetStateAction<WordStat | null>>;
}) => {
  return (
    <AnimatePresence>
      {tooltipContent && (
        <motion.div
          ref={tooltipRef}
          key="word-info"
          layout
          layoutId="word-info"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: hoveredWord ? 1 : 0,
            scale: 1,
            top: tooltipPosition.top,
            left: tooltipPosition.left,
          }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="absolute bg-card rounded-xl px-4 pt-3 pb-2 border border-border flex gap-4 items-center"
          onAnimationComplete={() => {
            if (!hoveredWord) {
              setTooltipContent(null);
            }
          }}
        >
          <div className="leading-[8px]">
            <p>{tooltipContent.wordSpeed.toFixed(2)}</p>
            <p className="text-muted-foreground text-xs">wpm</p>
          </div>
          <div className="leading-[8px]">
            <p>{(tooltipContent.wordTime / 1000).toFixed(2)}</p>
            <p className="text-muted-foreground text-xs">сек</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
