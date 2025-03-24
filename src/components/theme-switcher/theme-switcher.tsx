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

export const ThemeSwitcher = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <SwatchBook />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-transparent backdrop-blur-sm">
        <DialogTitle hidden>Choose a theme</DialogTitle>
        <ThemeList />
      </DialogContent>
    </Dialog>
  );
};
