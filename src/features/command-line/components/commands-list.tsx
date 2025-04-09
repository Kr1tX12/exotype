import { CommandGroupType, CommandType } from "../types/command-line.types";
import { COMMANDS } from "../constants/command-line.constants";
import { CommandGroup, CommandItem } from "@/shared/components/ui/command";
import { useCommandLineContext } from "./command-line-provider";

export const CommandsList = () => {
  const { setChosenCommand } = useCommandLineContext();

  const groupedCommands: { [key in CommandGroupType]?: CommandType[] } = {};

  for (const command of COMMANDS) {
    if (!groupedCommands[command.group]) {
      groupedCommands[command.group] = [];
    }
    groupedCommands[command.group]?.push(command);
  }

  const handleChooseCommand = (commandIndex: number) => {
    setChosenCommand(commandIndex);
  };

  return (Object.keys(groupedCommands) as CommandGroupType[]).map((group) => (
    <CommandGroup key={group} heading={group}>
      {groupedCommands[group]?.map((command: CommandType, index: number) => (
        <CommandItem
          onClick={() => handleChooseCommand(index)}
          key={command.name}
        >
          {command.icon && <command.icon />}
          {command.name}
        </CommandItem>
      ))}
    </CommandGroup>
  ));
};
