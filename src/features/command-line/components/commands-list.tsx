import React from "react";
import { CommandGroupType, CommandType } from "../types/command-line.types";
import { COMMANDS } from "../constants/command-line.constants";
import { CommandGroup, CommandItem } from "@/shared/components/ui/command";

export const CommandsList = () => {
  const groupedCommands: { [key in CommandGroupType]?: CommandType[] } = {};

  for (const command of COMMANDS) {
    if (!groupedCommands[command.group]) {
      groupedCommands[command.group] = [];
    }
    groupedCommands[command.group]?.push(command);
  }

  return (Object.keys(groupedCommands) as CommandGroupType[]).map((group) => (
    <CommandGroup key={group} heading={group}>
      {groupedCommands[group]?.map((command: CommandType) => (
        <CommandItem key={command.name}>{command.name}</CommandItem>
      ))}
    </CommandGroup>
  ));
};
