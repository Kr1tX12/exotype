import { Button } from "@/components/ui/button";
import { Settings, Crown, Zap } from "lucide-react";
import React from "react";

export const ButtonsPart = () => {
  return (
    <div className="flex items-center">
      <Button variant="ghost" className="rounded-xl size-11">
        <Settings className="size-10" />
      </Button>
      <Button size="icon" variant="ghost" className="rounded-xl size-11">
        <Crown />
      </Button>
      <Button size="icon" variant="ghost" className="rounded-xl size-11">
        <Zap />
      </Button>
    </div>
  );
};
