import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import React, { useEffect } from "react";

export const CommandLine = () => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      console.log(e.code)
      if (e.code === "KeyK" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search for a command" />
      <CommandList>
        <CommandEmpty>Nothing found</CommandEmpty>
        <CommandGroup heading="General">
          <CommandItem>Language</CommandItem>
          <CommandItem>Test settings</CommandItem>
          <CommandItem>Style settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
