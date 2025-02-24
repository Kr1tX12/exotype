"use client";

import { GroupPanel } from "../components/group-panel";
import { ToggleGroup } from "../components/toggle-group/toggle-group";

export const ParamsEditor = () => {
  return (
    <GroupPanel>
      <ToggleGroup>
        <ToggleGroup.Item storeKey="words" value={10}>
          10
        </ToggleGroup.Item>
        <ToggleGroup.Item storeKey="words" value={30}>
          30
        </ToggleGroup.Item>
        <ToggleGroup.Item storeKey="words" value={60}>
          60
        </ToggleGroup.Item>
        <ToggleGroup.Item storeKey="words" value={120}>
          120
        </ToggleGroup.Item>
        <ToggleGroup.Item storeKey="words" value={10000}>
          100000
        </ToggleGroup.Item>
      </ToggleGroup>
    </GroupPanel>
  );
};
