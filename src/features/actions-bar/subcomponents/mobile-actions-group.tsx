import React from "react";
import { Config } from "../types/actions-bar.types";
import { GroupPanel } from "./group-panel";
import { cn } from "@/shared/lib/utils";
import { ToggleGroup } from "./toggle-group";
import { TypingParams } from "@/store/slices/test/subslices/typingParams";

export const MobileActionsGroup = ({
  configData,
  className,
}: {
  configData: Config | null;
  className?: string;
}) => {
  const { config, id } = configData ?? { config: null, id: null };

  return (
    <GroupPanel className={cn("", className)}>
      <ToggleGroup groupId={id?.toString() ?? "no-id-suka"}>
        {config?.map(({ value, label, storeKey, icon }, id) => (
          <ToggleGroup.Item
            storeKey={storeKey as keyof TypingParams}
            value={value}
            multipleChoice={config[0].value === true}
            Icon={icon}
            key={id}
          >
            {label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup>
    </GroupPanel>
  );
};
