import { useRef, useState, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GroupPanel } from "./group-panel";
import { ToggleGroup } from "./toggle-group";
import { ActionsConfig } from "../actions-bar.types";
import { TypingParams } from "@/store/store";

type GroupPanelToggleGroupProps = {
  config: ActionsConfig[] | null;
};


// ЕСЛИ ЭТО ЧИТАЕТ СЕНЬОР+++ РАЗРАБОТЧИК
// ДАРОВА СЕНЬОР+++ РАЗРАБОТЧИК
// НЕ ХОТЕЛ БЫ ТЫ ИСПРАВИТЬ ДЁРГАНИЯ??????
export const GroupPanelToggleGroup = ({
  config,
}: GroupPanelToggleGroupProps) => {
  const groupId = config
    ? config.map(({ storeKey, value }) => `${storeKey}-${value}`).join("-")
    : "";

  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      if (containerRef.current) {
        setContentWidth(containerRef.current.scrollWidth);
      }
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {config && (
        <motion.div
          ref={containerRef}
          key="group-panel"
          initial={{ width: 0, marginRight: 0, marginLeft: 0 }}
          animate={{
            width: "auto",
            marginRight: 4,
            marginLeft: 4,
          }}
          exit={{ width: 0, marginRight: 0, marginLeft: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 1,
          }}
          style={{
            overflow: "hidden",
            display: "inline-block",
          }}
        >
          <GroupPanel>
            <AnimatePresence mode="wait">
              <motion.div
                key={groupId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }} 
                transition={{ duration: 0.15, ease: "easeInOut" }}
                className="size-full"
              >
                <ToggleGroup groupId={groupId}>
                  {config.map(({ storeKey, value, label, icon }) => (
                    <ToggleGroup.Item
                      multipleChoice={config[0].value === true}
                      key={label}
                      storeKey={storeKey as keyof TypingParams}
                      value={value}
                      Icon={icon}
                    >
                      {label}
                    </ToggleGroup.Item>
                  ))}
                </ToggleGroup>
              </motion.div>
            </AnimatePresence>
          </GroupPanel>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
