import { Button } from "@/components/ui/button";
import { Settings, Crown, Zap } from "lucide-react";
import React from "react";

export const ButtonsPart = () => {
  return (
    <div className="flex items-center">
      <Button size="icon" variant="ghost" className="rounded-full">
        <Settings />
      </Button>
      <Button size="icon" variant="ghost" className="rounded-full">
        <Crown />
      </Button>
      <Button size="icon" variant="ghost" className="rounded-full">
        <Zap />
      </Button>
    </div>
  );
};
