import {
  BookCheckIcon,
  BrainIcon,
  ClockIcon,
  LanguagesIcon,
  WholeWord,
} from "lucide-react";
import { CommandType } from "../types/command-line.types";
import { LANGUAGE_COMMANDS } from "./commands/language-commands";

export const COMMANDS: CommandType[] = [
  {
    name: "Language",
    icon: LanguagesIcon,
    group: "general",
    subcommands: LANGUAGE_COMMANDS,
  },
  {
    name: "Test type",
    icon: BookCheckIcon,
    group: "test",
  },
  {
    name: "Test duration",
    icon: ClockIcon,
    group: "test",
  },
  {
    name: "Test words",
    icon: WholeWord,
    group: "test",
  },
  {
    name: "Test sentences",
    icon: BrainIcon,
    group: "test",
  },
];
