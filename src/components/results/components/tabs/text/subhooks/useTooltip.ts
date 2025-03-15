import { WordStat } from "@/lib/utils/test-stats-generator";
import { RefObject, useEffect, useState } from "react";

export const useTooltip = ({
  tooltipRef,
  containerRef,
}: {
  tooltipRef: RefObject<HTMLDivElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
}) => {
  const [hoveredWord, setHoveredWord] = useState<{
    word: WordStat;
    rect: DOMRect;
  } | null>(null);
  const [tooltipContent, setTooltipContent] = useState<WordStat | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (hoveredWord && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: hoveredWord.rect.top - containerRect.top - 38,
        left: tooltipRef.current
          ? hoveredWord.rect.left +
              hoveredWord.rect.width / 2 -
              containerRect.left -
              tooltipRef.current.offsetWidth / 2 || 0
          : hoveredWord.rect.left - containerRect.left,
      });
      setTooltipContent(hoveredWord.word);
    }
  }, [hoveredWord, tooltipRef, containerRef]);

  return { tooltipContent, tooltipPosition, hoveredWord, setHoveredWord, setTooltipContent };
};
