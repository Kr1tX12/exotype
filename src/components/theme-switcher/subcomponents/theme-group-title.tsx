import React from "react";

export const ThemeGroupTitle = ({ children }: { children: string }) => {
  return (
    <h3 className="uppercase text-sm font-bold text-foreground mt-2">
      {children}
    </h3>
  );
};
