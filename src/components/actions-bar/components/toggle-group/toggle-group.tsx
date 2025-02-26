/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TypingParams, useStore } from "@/store/store";
import { LucideProps } from "lucide-react";

export const ToggleGroup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn("flex items-center justify-evenly size-full")}>
      {children}
    </div>
  );
};

type ItemProps = {
  children: string;
  storeKey: keyof TypingParams;
  value: any;
  multipleChoice?: boolean;
  defaultValue?: any;
  Icon?: React.ComponentType<LucideProps>;
  iconYOffset?: number;
};

const ToggleGroupItem = ({
  children,
  storeKey,
  value,
  Icon,
  multipleChoice = false,
  defaultValue,
  iconYOffset = 0,
}: ItemProps) => {
  const { updateTypingParam, typingParams } = useStore();

  const currentValue = typingParams[storeKey];

  const isChosen = currentValue === value;

  const hasGradient = value === "ai" && !isChosen;

  // Здесь типо при нажатии обновляется ХРАНИЛИЩЕ!
  const handleClick = () => {
    if (!isChosen) {
      updateTypingParam(storeKey, value);
    } else if (multipleChoice) {
      updateTypingParam(storeKey, defaultValue);
    }
  };

  // Эта кнопка типо на главной странице, когда выбираешь режим типо на время, на слова
  return (
    <span
      onClick={handleClick}
      className={cn(
        "h-full flex justify-center items-center gap-2 text-xs",
        "select-none whitespace-nowrap cursor-pointer",
        "px-4 py-1 transition-colors hover:text-foreground active:text-muted-foreground",
        isChosen ? "text-primary" : "text-muted-foreground"
      )}
    >
      {Icon && (
        <Icon
          size={16}
          className={cn(hasGradient && "stroke-[url(#gradient)]")} // Применяем градиент к иконке
          style={{ transform: `translateY(${iconYOffset}px)` }}
        />
      )}
      <span
        className={cn(
          hasGradient &&
            "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-500 to-purple-500 bg-[length:200%_200%]",
          "animate-gradient"
        )}
      >
        {children}
      </span>
      {/* SVG-градиент */}
      <svg width="0" height="0" className="absolute invisible">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" /> {/* from-blue-400 */}
            <stop offset="50%" stopColor="#10b981" /> {/* via-green-500 */}
            <stop offset="100%" stopColor="#8b5cf6" /> {/* to-purple-500 */}
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
};

interface ItemWithTooltipProps extends ItemProps {
  tooltip: string;
}
const ToggleGroupItemWithTooltip = ({
  tooltip,
  ...props
}: ItemWithTooltipProps) => {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger>
          <ToggleGroupItem {...props} />
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

ToggleGroup.Item = ToggleGroupItem;
ToggleGroup.ItemWithTooltip = ToggleGroupItemWithTooltip;
