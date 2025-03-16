import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { GroupPanel } from "./group-panel";
import { ToggleGroup } from "./toggle-group";
import { ActionsConfig } from "../actions-bar.types";
import { TypingParams } from "@/store/store";

type GroupPanelToggleGroupProps = {
  config: ActionsConfig[] | null;
};

export const GroupPanelToggleGroup = ({ config }: GroupPanelToggleGroupProps) => {
  // Вычисляем новый groupId на основе config
  const newGroupId = config
    ? config.map(({ storeKey, value }) => `${storeKey}-${value}`).join("-")
    : "";

  const [currentGroupId, setCurrentGroupId] = useState(newGroupId);


  return (
    <AnimatePresence>
      {config && (
        <motion.div
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
          layout
        >
          <GroupPanel>
            <AnimatePresence
              mode="wait"
              onExitComplete={() => {
                if (currentGroupId !== newGroupId) {
                  setCurrentGroupId(newGroupId);
                }
              }}
            >
              <motion.div
                key={currentGroupId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                className="size-full"
              >
                <ToggleGroup groupId={currentGroupId}>
                  {config.map(({ storeKey, value, label, icon }) => (
                    <ToggleGroup.Item
                      multipleChoice={config[0].value === true}
                      key={`${storeKey}-${value}`}
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
