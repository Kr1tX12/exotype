import React from "react";

export const SecondaryText = ({ children }: { children: string }) => {
  return <div className="text-muted-foreground text-xl">{children}</div>;
};
