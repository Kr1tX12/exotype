/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, LayoutGroup } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip-shadcn";
import { cn } from "@/shared/lib/utils";
import { useStore } from "@/store/store";
import React from "react";
import { TypingParams } from "@/store/slices/test/subslices/typingParams";

type ToggleGroupProps = {
  groupId: string; // уникальный идентификатор для каждой группы
  children: React.ReactNode;
};

export const ToggleGroup = ({ groupId, children }: ToggleGroupProps) => {
  return (
    <LayoutGroup>
      <div className={cn("relative flex items-center size-full")}>
        {React.Children.map(children, (child) => {
          if (
            React.isValidElement<ItemProps>(child) &&
            "storeKey" in child.props
          ) {
            return React.cloneElement(child, { groupId });
          }
          return child;
        })}
      </div>
    </LayoutGroup>
  );
};

type ItemProps = {
  children: string;
  storeKey: keyof TypingParams;
  value: any;
  multipleChoice?: boolean;
  defaultValue?: any;
  Icon?: React.ComponentType<{ className?: string; style?: object }>;
  iconYOffset?: number;
  groupId?: string;
};

const ToggleGroupItem = ({
  children,
  storeKey,
  value,
  Icon,
  multipleChoice = false,
  defaultValue,
  iconYOffset = 0,
  groupId = "default", // значение по умолчанию, если не передан groupId
}: ItemProps) => {
  const { updateTypingParam, typingParams } = useStore();
  const currentValue = typingParams[storeKey];
  const isChosen = currentValue === value;
  const hasGradient = value === "ai" && !isChosen;

  const handleClick = () => {
    if (!isChosen) {
      updateTypingParam(storeKey, value);
    } else if (multipleChoice) {
      updateTypingParam(storeKey, defaultValue);
    }
  };

  return (
    <motion.span
      layout
      onClick={handleClick}
      className={cn(
        "relative h-full flex justify-center items-center gap-3 text-[1.1rem] group",
        "select-none whitespace-nowrap cursor-pointer px-4 py-4 transition-colors active:text-muted-foreground",
        isChosen ? "text-primary" : "text-muted-foreground"
      )}
    >
      {isChosen && !multipleChoice && (
        <motion.div
          layout
          layoutId={`${groupId}-toggle-background`}
          className="absolute bottom-1 right-2 left-2 h-[0.2rem] bg-primary rounded-md"
          transition={{ duration: 0.2, ease: "easeInOut" }}
        />
      )}
      {Icon && (
        <Icon
          //size={16}
          className={cn(
            hasGradient && "stroke-[url(#gradient)]",
            "relative z-10 size-5 group-active:mt-1 transition-all"
          )}
          style={{ transform: `translateY(${iconYOffset}px)` }}
        />
      )}
      <span
        className={cn(
          hasGradient &&
            "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-500 to-purple-500 bg-[length:200%_200%] animate-gradient",
          "relative z-10 group-active:mt-1 transition-all"
        )}
      >
        {children}
      </span>
      {/* SVG-градиент */}
      <svg width="0" height="0" className="absolute invisible">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </motion.span>
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
        <TooltipTrigger className="size-full">
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
