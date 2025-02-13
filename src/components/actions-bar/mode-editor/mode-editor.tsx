"use client";

import {
  Book,
  BookIcon,
  BookOpen,
  CaseLower,
  CaseUpper,
  Clock,
  ScrollText,
  TextCursor,
  TextIcon,
  WholeWord,
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
      </ToggleGroup>
    </GroupPanel>
  );
};
