import { useStore } from "@/store/store";
import { ActionsGroup } from "./subcomponents/actions-group";
import {
  FEATURES_CONFIG,
  MODE_CONFIG,
  PARAMS_CONFIG_SENTENCES,
  PARAMS_CONFIG_TIME,
  PARAMS_CONFIG_WORDS,
} from "./constants/actions-bar.constants";
import { cn } from "@/lib/utils";
import { MobileNumberConfig } from "./subcomponents/mobile-number-config";
import { MobileActionsGroup } from "./subcomponents/mobile-actions-group";
import { HideOnTyping } from "@/components/hide-on-typing";

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
    <HideOnTyping
      className={cn(
        "w-full h-12 px-12",
        "xl:grid xl:grid-cols-[1fr,1fr,1fr] xl:gap-2",
        "max-xl:flex max-xl:flex-col max-xl:items-center max-xl:gap-0.5",
        "max-sm:scale-[0.7] max-lg:scale-[0.8] max-xl:scale-[0.85] z-10"
      )}
    >
      <div className="xl:justify-self-end max-xl:hidden">
        <ActionsGroup configData={featuresConfig} />
      </div>
      <div className="xl:justify-self-center">
        <ActionsGroup configData={modeConfig} />
      </div>
      <div className="xl:justify-self-start max-xl:hidden">
        <ActionsGroup configData={paramsConfig} />
      </div>

      <div className="xl:hidden flex gap-2">
        {paramsConfig && (
          <MobileNumberConfig
            key={paramsConfig.id.toString()}
            config={paramsConfig}
          />
        )}
        {featuresConfig && (
          <MobileActionsGroup
            configData={featuresConfig}
            key={featuresConfig.id.toString()}
          />
        )}
      </div>
    </HideOnTyping>
  );
};
