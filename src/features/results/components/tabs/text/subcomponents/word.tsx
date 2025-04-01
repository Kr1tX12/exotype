
import { WordStat } from "@/lib/utils/test-stats-generator";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Letter } from "./letter";

export type Color = "min" | "xmin" | "avg" | "xavg" | "max" | "xmax";

export interface WordProps {
  word: WordStat;
  color: Color;
  onHover: (rect: DOMRect) => void;
  onHoverEnd: () => void;
}

export const Word = ({ word, color, onHover, onHoverEnd }: WordProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      onHoverStart={() => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          onHover(rect);
        }
      }}
      onHoverEnd={onHoverEnd}
      className="relative cursor-pointer px-1 py-1 inline-block"
      style={{
        color: {
          min: "hsl(var(--foreground) / 0.4)",
          xmin: "hsl(var(--foreground) / 0.5)",
          avg: "hsl(var(--foreground) / 0.6)",
          xavg: "hsl(var(--primary) / 0.7)",
          max: "hsl(var(--primary) / 0.8)",
          xmax: "hsl(var(--primary))",
        }[color],
      }}
    >
      {word.letters.map((letter, index) => (
        <Letter key={index} letter={letter} />
      ))}
    </motion.div>
  );
};