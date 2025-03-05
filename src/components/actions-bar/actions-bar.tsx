import { useStore } from "@/store/store";
import { GroupPanelToggleGroup } from "./subcomponents/group-panel-toggle-group";
import {
  FEATURES_CONFIG,
  MODE_CONFIG,
  PARAMS_CONFIG_SENTENCES,
  PARAMS_CONFIG_TIME,
  PARAMS_CONFIG_WORDS,
} from "./actions-bar.constants";

export const ActionsBar = () => {
  const typingParams = useStore((state) => state.typingParams);

  const featuresConfig = ["time", "words"].includes(typingParams.mode)
    ? FEATURES_CONFIG
    : null;
  const modeConfig = MODE_CONFIG;
  const paramsConfig = {
    time: PARAMS_CONFIG_TIME,
    words: PARAMS_CONFIG_WORDS,
    ai: PARAMS_CONFIG_SENTENCES,
    free: null,
    custom: null,
    text: null,
  }[typingParams.mode];

  return (
    <div className="w-full flex justify-center px-12">
      <GroupPanelToggleGroup config={featuresConfig} />
      <GroupPanelToggleGroup config={modeConfig} />
      <GroupPanelToggleGroup config={paramsConfig} />
    </div>
  );
};
