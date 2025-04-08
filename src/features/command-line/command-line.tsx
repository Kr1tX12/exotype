import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/shared/components/ui/command";
import React, { useEffect } from "react";
import { CommandsList } from "./components/commands-list";

export const CommandLine = () => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      console.log(e.code);
      if (e.code === "KeyK" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for a command" />
        <CommandList>
          <CommandEmpty>Nothing found</CommandEmpty>
          <CommandsList />
        </CommandList>
      </CommandDialog>
    </div>
  );
};
