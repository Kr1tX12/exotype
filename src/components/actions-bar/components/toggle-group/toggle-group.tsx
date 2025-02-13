"use client";

import { cn } from "@/lib/utils/utils";
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

ToggleGroup.Item = ({
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
    <button
      onClick={handleClick}
      className={cn(
        "h-full flex justify-center items-center gap-2 text-xs",
        "select-none whitespace-nowrap cursor-pointer",
        "px-4 py-1 transition-colors hover:text-foreground active:text-muted-foreground",
        isChosen ? "text-primary" : "text-muted-foreground"
      )}
    >
      {Icon && (
        <Icon size={16} style={{ transform: `translateY(${iconYOffset}px)` }} />
      )}
      {children}
    </button>
  );
};
