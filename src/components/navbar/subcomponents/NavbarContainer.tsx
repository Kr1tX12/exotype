import React, { ReactNode } from "react";

export const NavbarContainer = ({ children }: { children: ReactNode }) => {
  return (
    <header className="container gap-4">
      <nav className="grid grid-cols-3 gap-8 justify-between items-center bg-muted/20 rounded-lg h-16 my-6 px-6">
        {children}
      </nav>
    </header>
  );
};
