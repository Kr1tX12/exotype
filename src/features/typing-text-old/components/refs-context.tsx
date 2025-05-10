import { createContext, useContext, useRef, ReactNode, RefObject } from "react";

type TypingRefsContextType = {
  containerRef: RefObject<HTMLDivElement | null>;
  caretRef: RefObject<HTMLDivElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
};

const TypingRefsContext = createContext<TypingRefsContextType | null>(null);

export const useTypingRefs = () => {
  const context = useContext(TypingRefsContext);
  if (!context)
    throw new Error("useTypingRefs must be used within <TypingRefsProvider>");
  return context;
};

export const TypingRefsProvider = ({ children }: { children: ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <TypingRefsContext.Provider value={{ containerRef, caretRef, inputRef }}>
      {children}
    </TypingRefsContext.Provider>
  );
};
