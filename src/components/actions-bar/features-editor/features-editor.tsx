"use client";

import { Binary, CaseSensitive } from "lucide-react";
import { GroupPanel } from "../components/group-panel";
import { ToggleGroup } from "../components/toggle-group/toggle-group";

export const FeaturesEditor = () => {
  return (
    <GroupPanel>
      <ToggleGroup>
        <ToggleGroup.Item multipleChoice Icon={CaseSensitive} iconYOffset={2} storeKey="punctuation" value={true} defaultValue={false}>
          Пунктуация
        </ToggleGroup.Item>
        <ToggleGroup.Item multipleChoice Icon={Binary} storeKey="numbers" value={true} defaultValue={false}>
          Цифры
        </ToggleGroup.Item>
      </ToggleGroup>
    </GroupPanel>
  );
};
