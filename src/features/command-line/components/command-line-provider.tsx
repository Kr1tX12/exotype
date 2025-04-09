"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type CommandLineContextType = {
  chosenCommand: number | null;
  setChosenCommand: Dispatch<SetStateAction<number | null>>;
} | null;

const Context = createContext<CommandLineContextType>(null);

export const CommandLineProvider = ({ children }: { children: ReactNode }) => {
  const [chosenCommand, setChosenCommand] = useState<number | null>(null);

  return (
    <Context.Provider value={{ chosenCommand, setChosenCommand }}>
      {children}
    </Context.Provider>
  );
};

export const useCommandLineContext = () => {
  const state = useContext(Context);

  if (!state) {
    throw new Error("useCommandLine must be used within a CommandLineProvider");
  }

  return state;
};
