import React, { ReactNode } from "react";

export const NavbarContainer = ({ children }: { children: ReactNode }) => {
  return (
    <header className="container flex flex-col gap-4">
      <nav className="flex gap-8 justify-between items-center bg-muted/20 rounded-lg h-16 my-6 px-6">
        {children}
      </nav>
    </header>
  );
};
