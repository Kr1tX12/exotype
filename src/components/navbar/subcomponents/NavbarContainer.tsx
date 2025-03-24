import React, { ReactNode } from "react";

export const NavbarContainer = ({ children }: { children: ReactNode }) => {
  return (
    <header className="sm:container gap-4">
      <nav className="grid grid-cols-3 max-md:grid-cols-2 gap-8 justify-between items-center bg-muted/30 sm:rounded-xl h-20 my-6 px-6">
        {children}
      </nav>
    </header>
  );
};
