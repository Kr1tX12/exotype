"use client";

import { GroupPanel } from "../components/group-panel";
import { ToggleGroup } from "../components/toggle-group/toggle-group";

export const ParamsEditor = () => {
  return (
    <GroupPanel>
      <ToggleGroup>
        <ToggleGroup.Item storeKey="words" value={1}>
          1
        </ToggleGroup.Item>
        <ToggleGroup.Item storeKey="words" value={2}>
          2
        </ToggleGroup.Item>
        <ToggleGroup.Item storeKey="words" value={5}>
          5
        </ToggleGroup.Item>
        <ToggleGroup.Item storeKey="words" value={10}>
          10
        </ToggleGroup.Item>
        <ToggleGroup.Item storeKey="words" value={25}>
          25
        </ToggleGroup.Item>
      </ToggleGroup>
    </GroupPanel>
  );
};
