"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ThemeList } from "./subcomponents/themes-list";
import { Button } from "../ui/button";
import { SwatchBook } from "lucide-react";

export const ThemeSwitcher = ({ full = false }: { full?: boolean }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size={full ? "sm" : "icon"}>
          <SwatchBook />
          {full && "Темы"}
        </Button>
      </DialogTrigger>
      <DialogContent gradient className="gap-0">
        <DialogTitle hidden>Choose a theme</DialogTitle>
        <ThemeList />
      </DialogContent>
    </Dialog>
  );
};
