import React, { ReactNode } from "react";

export const NavbarContainer = ({ children }: { children: ReactNode }) => {
  return (
    <header className="container gap-4">
      <nav className="grid grid-cols-3 gap-8 justify-between items-center bg-muted/30 rounded-xl h-20 my-6 px-6">
        {children}
      </nav>
    </header>
  );
};
