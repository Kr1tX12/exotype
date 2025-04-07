import { ReactElement } from "react";

export type CommandGroupType = "general" | "preferences" | "user" | "test";

export type CommandType = {
  name: string;
  icon: ReactElement;
  group: CommandGroupType;
};
