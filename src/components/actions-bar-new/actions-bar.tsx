import React from "react";
import { ActionBar } from "./subcomponents/action-bar";
import {
  FEATURES_CONFIG,
  MODE_CONFIG,
  PARAMS_CONFIG_SENTENCES,
  PARAMS_CONFIG_TIME,
  PARAMS_CONFIG_WORDS,
} from "./constants/actions-bar.constants";
import { useStore } from "@/store/store";
import { AnimatePresence } from "framer-motion";

export const ActionsBar = () => {
  const typingParams = useStore((state) => state.typingParams);

  const featuresConfig = ["time", "words"].includes(typingParams.mode)
    ? FEATURES_CONFIG
    : null;
  const modeConfig = MODE_CONFIG;
  const paramsConfig = {
    time: { data: PARAMS_CONFIG_TIME, id: 2 },
    words: { data: PARAMS_CONFIG_WORDS, id: 3 },
    ai: { data: PARAMS_CONFIG_SENTENCES, id: 4 },
    free: null,
    custom: null,
    text: null,
  }[typingParams.mode];

  return (
    <div className="flex gap-4 items-center justify-center">
      <AnimatePresence mode="wait">
        {featuresConfig && (
          <ActionBar 
            key="features" 
            id={0} 
            config={featuresConfig} 
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        {modeConfig && (
          <ActionBar 
            key="mode" 
            id={1} 
            config={modeConfig} 
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        {paramsConfig && (
          <ActionBar
            key={`params-${typingParams.mode}`}
            id={paramsConfig.id}
            config={paramsConfig.data}
          />
        )}
      </AnimatePresence>
    </div>
  );
};