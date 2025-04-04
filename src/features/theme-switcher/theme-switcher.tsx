"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { ThemeList } from "./subcomponents/themes-list";
import { Button } from "../../components/ui/button";
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
