import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { createContext, ReactNode, useContext } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip-shadcn";
import { IconSkull } from "@tabler/icons-react";

const TabsContext = createContext<{
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  vertical: boolean;
  id: string;
} | null>(null);

export const AnimatedTabs = ({
  children,
  className,
  activeIndex,
  setActiveIndex,
  vertical = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  vertical?: boolean;
  id: string;
}) => {
  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex, vertical, id }}>
      <div
        className={cn(
          "rounded-xl px-2 py-2 flex bg-muted/30 gap-4",
          vertical ? "flex-col flex-grow h-full" : "",
          className
        )}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const Tab = ({
  children,
  className,
  index,
  locked = false,
}: {
  children: ReactNode;
  className?: string;
  index: number;
  locked?: boolean;
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tab must be used within AnimatedTabs");

  const { activeIndex, setActiveIndex, vertical, id } = context;
  const isActive = activeIndex === index;

  return (
    <TooltipProvider delayDuration={10}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => locked || setActiveIndex(index)}
            className={cn(
              "px-2 py-1 relative transition flex jusitfy-center items-center",
              locked
                ? "text-muted-foreground cursor-default"
                : "duration-300 hover:bg-muted rounded-xl",
              vertical && "h-full",
              className
            )}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {isActive && (
              <motion.span
                layoutId={id}
                className="absolute inset-0 z-10 bg-foreground mix-blend-difference rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {children}
          </button>
        </TooltipTrigger>
        {locked && (
          <TooltipContent className="flex gap-1 items-center text-lg font-medium">
            <IconSkull />
            СКОРО
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};
