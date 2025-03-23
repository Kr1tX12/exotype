import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { GroupPanel } from "./group-panel";
import { ToggleGroup } from "./toggle-group";
import { TypingParams } from "@/store/store";
import { Config } from "../types/actions-bar.types";

type GroupPanelToggleGroupProps = {
  configData: Config | null;
};

const animationDuration = 0.15;

export const ActionsGroup = ({ configData }: GroupPanelToggleGroupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleConfig, setVisibleConfig] = useState<Config | null>(null);

  const { config, id: configId } = visibleConfig ?? { config: null, id: null };

  useEffect(() => {
    setIsVisible(false);
    const timeout = setTimeout(() => {
      setVisibleConfig(configData);
      setIsVisible(true);
    }, animationDuration * 1000);

    return () => clearTimeout(timeout);
  }, [configData]);

  return (
    <AnimatePresence>
      {config && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "auto" }}
          exit={{ width: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 1,
          }}
          className="overflow-hidden inline-block"
          layout
        >
          <GroupPanel>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: isVisible ? 1 : 0,
              }}
              transition={{ duration: animationDuration, ease: "easeInOut" }}
              className="size-full"
            >
              <ToggleGroup groupId={configId}>
                {config.map(({ storeKey, value, label, icon, tooltip }) => {
                  const ToggleGroupItem = tooltip
                    ? ToggleGroup.ItemWithTooltip
                    : ToggleGroup.Item;

                  return (
                    <ToggleGroupItem
                      key={`${storeKey}-${value}`}
                      multipleChoice={config[0].value === true}
                      storeKey={storeKey as keyof TypingParams}
                      value={value}
                      Icon={icon}
                      tooltip={tooltip ?? ""}
                    >
                      {label}
                    </ToggleGroupItem>
                  );
                })}
              </ToggleGroup>
            </motion.div>
          </GroupPanel>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
