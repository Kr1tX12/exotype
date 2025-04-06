"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../shared/components/ui/dialog";
import { ThemeList } from "./subcomponents/themes-list";
import { Button } from "../../shared/components/ui/button";
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
      <DialogContent className="gap-0 transition-none">
        <DialogTitle hidden>Choose a theme</DialogTitle>
        <ThemeList />
      </DialogContent>
    </Dialog>
  );
};
