"use client";

import {
  Brain,
  Clock,
  ScrollText,
  TextCursor, WholeWord
} from "lucide-react";
import { GroupPanel } from "../components/group-panel";
import { ToggleGroup } from "../components/toggle-group/toggle-group";

export const ModeEditor = () => {
  return (
    <GroupPanel>
      <ToggleGroup>
        <ToggleGroup.Item storeKey="mode" value="time" Icon={Clock}>
          На время
        </ToggleGroup.Item>
        <ToggleGroup.Item storeKey="mode" value="words" Icon={WholeWord}>
          Слова
        </ToggleGroup.Item>
        <ToggleGroup.Item storeKey="mode" value="text" Icon={ScrollText}>
          Тексты
        </ToggleGroup.Item>
        <ToggleGroup.Item storeKey="mode" value="free" Icon={TextCursor}>
          Свободный
        </ToggleGroup.Item>
        <ToggleGroup.ItemWithTooltip tooltip="Искусственная интуиция" storeKey="mode" value="ai" Icon={Brain}>
          ИИ
        </ToggleGroup.ItemWithTooltip>
      </ToggleGroup>
    </GroupPanel>
  );
};
