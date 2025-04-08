import { ElementType } from "react";

export type CommandGroupType = "general" | "preferences" | "user" | "test";

export type CommandType = {
  name: string;
  icon: ElementType;
  group: CommandGroupType;
};
