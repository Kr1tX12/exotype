import Image from "next/image";
import React from "react";

export const ThemeImage = ({ src }: { src: string }) => {
  return (
    <div>
      <Image className="rounded-xl shadow-xl shadow-primary/10" src={src} width={200} height={200} alt="theme-image" />
    </div>
  );
};
