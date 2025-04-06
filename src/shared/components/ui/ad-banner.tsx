"use client";

import React, { useEffect, useState } from "react";

export const AdBanner = ({
  blockId,
  darkTheme,
}: {
  blockId: string;
  darkTheme: boolean;
}) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [darkTheme]);

  useEffect(() => {
    if (window.yaContextCb) {
      if (process.env.NEXT_PUBLIC_SITE_URL !== "https://exotype.fun") return;

      window.yaContextCb.push(() => {
        Ya.Context.AdvManager.render({
          blockId: blockId,
          renderTo: `yandex-${blockId}-${key}`,
          darkTheme: darkTheme,
        });
      });
    }
  }, [blockId, darkTheme, key]);

  return (
    <div className="w-96 h-32 mb-12 max-lg:hidden relative">
      <div
        id={`yandex-${blockId}-${key}`}
        className="rounded-xl size-full z-50 absolute inset-0 flex justify-center items-center"
      />
    </div>
  );
};
