"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownContextProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const DropdownContext = createContext<DropdownContextProps | null>(null);

interface DropdownProps {
  children: ReactNode;
  hover?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({ children, hover = true }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <DropdownContext.Provider value={{ isOpen, open, close, toggle }}>
      <div
        className="relative inline-block"
        onMouseEnter={hover ? open : undefined}
        onMouseLeave={hover ? close : undefined}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

interface DropdownTriggerProps {
  children: ReactNode;
}

/** Компонент для триггера. Если не используется hover, можно кликнуть для переключения */
export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  children,
}) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("DropdownTrigger должен использоваться внутри Dropdown");
  }

  return (
    <div onClick={context.toggle} className="cursor-pointer">
      {children}
    </div>
  );
};

interface DropdownMenuProps {
  children: ReactNode;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("DropdownMenu должен использоваться внутри Dropdown");
  }

  const menuVariants = {
    open: { opacity: 1, scale: 1, height: "auto", transition: { duration: 0.2 } },
    closed: { opacity: 0, scale: 0.8, height: 0, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {context.isOpen && (
        <motion.div
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="absolute -right-10 w-48 bg-transparent backdrop-blur-md border border-border rounded-xl shadow-lg z-10"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface DropdownItemProps {
  children: ReactNode;
  onClick?: () => void;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  onClick,
}) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("DropdownItem должен использоваться внутри Dropdown");
  }

  const handleClick = () => {
    if (onClick) onClick();
    context.close();
  };

  return (
    <div
      onClick={handleClick}
      className="px-4 py-2 bg-transparent cursor-pointer hover:bg-muted/30 rounded-xl transition-colors"
    >
      {children}
    </div>
  );
};
