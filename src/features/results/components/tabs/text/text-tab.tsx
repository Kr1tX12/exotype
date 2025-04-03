import { motion } from "framer-motion";
import { useRef } from "react";
import { Word } from "./subcomponents/word";
import { useTooltip } from "./subhooks/useTooltip";
import { getColorBySpeed } from "./utils/getColorBySpeed";
import { WordTooltip } from "./subcomponents/word-tooltip";
import { TextToolsGroup } from "./subcomponents/text-tools-group";
import { useStats } from "../../stats-provider";

export const TextTab = () => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    setHoveredWord,
    tooltipContent,
    tooltipPosition,
    setTooltipContent,
    hoveredWord,
  } = useTooltip({
    tooltipRef,
    containerRef,
  });

  const { stats } = useStats();

  if (!stats) return;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0"
    >
      <TextToolsGroup />
      <div className="relative">
        <div className="pt-12 text-xl">
          {stats.words.map((word, index) => {
            const color = getColorBySpeed({
              speed: word.wordSpeed,
              minWpm: stats.minWordWpm,
              maxWpm: stats.maxWordWpm,
            });
            return (
              <Word
                key={index}
                word={word}
                color={color}
                onHover={(rect) => setHoveredWord({ word, rect })}
                onHoverEnd={() => setHoveredWord(null)}
              />
            );
          })}
        </div>
        <WordTooltip
          tooltipContent={tooltipContent}
          tooltipRef={tooltipRef}
          hoveredWord={hoveredWord}
          tooltipPosition={tooltipPosition}
          setTooltipContent={setTooltipContent}
        />
      </div>
    </motion.div>
  );
};
