import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import React from "react";
import { useCommandLineContext } from "./command-line-provider";
import { COMMANDS } from "../constants/command-line.constants";
import { Button } from "@/shared/components/ui/button";

export const SubcommandModal = () => {
  const { chosenCommand } = useCommandLineContext();

  const open = chosenCommand !== null;

  const subcommands = open
    ? COMMANDS[chosenCommand].subcommands
    : null;

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subcommands</DialogTitle>
        </DialogHeader>

        {subcommands?.map((subcommand, index) => (
          <Button key={index}>{subcommand.name}</Button>
        ))}
      </DialogContent>
    </Dialog>
  );
};
