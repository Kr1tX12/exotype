import { motion } from "framer-motion";
import React from "react";
import { ActionsConfig } from "../types/actions-bar.types";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { TypingParams } from "@/store/store";

export const ActionBar = ({ config, id }: { config: ActionsConfig[], id: number }) => {
  // Create a stable key for the content based on the config values
  const contentKey = config.map(item => `${item.storeKey}-${item.value}`).join('-');
  
  return (
    <motion.div 
      layout="preserve-aspect"
      initial={{ width: 0 }}
      animate={{ 
        width: "auto",
        transition: { 
          duration: 0.25,
          ease: [0.32, 0.72, 0, 1]
        }
      }}
      exit={{ 
        width: 0,
        transition: { 
          duration: 0.25,
          ease: [0.32, 0.72, 0, 1]
        }
      }}
      className="bg-muted/30 rounded-xl h-11 overflow-hidden"
    >
      <div className="h-full px-9 whitespace-nowrap">
        {/* Use key to trigger re-render with animation when config changes */}
        <motion.div
          key={contentKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          <ToggleGroup groupId={id.toString()}>
            {config.map((item, index) => (
              <ToggleGroup.Item
                key={index}
                storeKey={item.storeKey as keyof TypingParams}
                value={item.value}
                Icon={item.icon}
              >
                {item.label}
              </ToggleGroup.Item>
            ))}
          </ToggleGroup>
        </motion.div>
      </div>
    </motion.div>
  );
};