import { cn } from "@/lib/utils";
import React, { HTMLProps } from "react";

interface CopyTextProps extends HTMLProps<HTMLSpanElement> {
  text: string;
}

const CopyText: React.FC<CopyTextProps> = ({ text, children, className, ...props }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Текст скопирован в буфер обмена!");
    } catch (err) {
      console.error("Ошибка при копировании текста:", err);
    }
  };

  return (
    <span
      onClick={handleCopy}
      className={cn("cursor-pointer text-primary hover:text-primary/60 transition-colors", className)}
      {...props}
    >
      {children || text}
    </span>
  );
};

export default CopyText;
