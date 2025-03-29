import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode, useState, useRef } from "react";
import ReactDOM from "react-dom";

export const Tooltip = ({
  text,
  children,
}: {
  text: string | ReactNode;
  children: React.ReactElement<React.HTMLProps<HTMLElement | SVGElement>>;
}) => {
  const [visible, setVisible] = useState(false);

  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const ref = useRef<SVGElement | HTMLElement>(null);

  const handleMouseEnter = () => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setCoords({
        top: rect.top,
        left: rect.left + rect.width / 2,
      });
    }
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  // Если children является валидным React-элементом, клонируем его с новыми пропсами
  const childWithProps = React.isValidElement(children)
    ? React.cloneElement(children, {
        ref,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      })
    : children;
  return (
    <>
      {childWithProps}
      {ReactDOM.createPortal(
        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, x: "-50%", y: "-100%" }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: "-100%" }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 600, damping: 30 }}
              style={{
                top: coords.top - 8,
                left: coords.left,
              }}
              className="absolute bg-primary text-background py-2 px-4 rounded-xl z-50 pointer-events-none text-xs origin-bottom"
            >
              {text}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
