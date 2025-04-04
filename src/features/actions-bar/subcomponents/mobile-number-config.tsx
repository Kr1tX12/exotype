import { GroupPanel } from "./group-panel";
import { clamp, cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Config } from "../types/actions-bar.types";
import { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "@/store/store";
import { AnimatePresence, motion } from "framer-motion";
import { TypingParams } from "@/store/slices/typingParams";

export const MobileNumberConfig = ({
  className,
  config,
}: {
  className?: string;
  config: Config | null;
}) => {
  const [numberIndexNow, setNumberIndexNow] = useState(0);
  const updateTypingParam = useStore((state) => state.updateTypingParam);
  const typingParams = useStore((state) => state.typingParams);
  const storeKey = config?.config[0].storeKey as keyof TypingParams;
  const direction = useRef<"incrementing" | "decrementing">(null);

  const numbers = useMemo(
    () => config?.config.map(({ value }) => value) as number[],
    [config]
  );

  const handleIncrementIndexNow = (index: number) => {
    direction.current = index > 0 ? "incrementing" : "decrementing";
    if (numbers[numberIndexNow + index] === undefined) return;

    const newNumberIndex = clamp(numberIndexNow + index, 0, numbers.length - 1);

    updateTypingParam(storeKey, numbers[newNumberIndex]);
  };

  useEffect(() => {
    setNumberIndexNow(numbers.indexOf(typingParams[storeKey] as number) ?? 0);
  }, [numbers, storeKey, typingParams]);

  const canIncrement = numberIndexNow < numbers.length - 1;
  const canDecrement = numberIndexNow > 0;

  return (
    config && (
      <GroupPanel
        className={cn(
          "flex gap-2 items-center py-2 justify-center select-none",
          className
        )}
      >
        <button
          type="button"
          onClick={() => handleIncrementIndexNow(-1)}
          className={cn(
            "text-muted-foreground transition-opacity",
            !canDecrement && "opacity-50 cursor-default"
          )}
        >
          <ChevronLeft />
        </button>
        <AnimatePresence mode="popLayout">
          <motion.p
            initial={{
              x: direction.current === "decrementing" ? -25 : 25,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: direction.current === "incrementing" ? -25 : 25,
              opacity: 0,
            }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            key={numbers[numberIndexNow]}
            className="w-16 text-center cursor-pointer -z-10"
          >
            {numbers[numberIndexNow]}
          </motion.p>
        </AnimatePresence>
        <button
          type="button"
          onClick={() => handleIncrementIndexNow(1)}
          className={cn(
            "text-muted-foreground transition-opacity",
            !canIncrement && "opacity-50 cursor-default"
          )}
        >
          <ChevronRight />
        </button>
      </GroupPanel>
    )
  );
};
