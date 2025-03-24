"use client";

import React, { useEffect } from "react";

export const AdBanner = ({
  blockId,
  darkTheme,
}: {
  blockId: string;
  darkTheme: boolean;
}) => {
  useEffect(() => {
    if (window.yaContextCb) {
      if (process.env.NEXT_PUBLIC_SITE_URL !== "https://exotype.fun") return;

      window.yaContextCb.push(() => {
        Ya.Context.AdvManager.render({
          blockId: blockId,
          renderTo: `yandex-${blockId}`,
          darkTheme: darkTheme,
        });
      });
    }
  }, [blockId, darkTheme]);

  return (
    <div className="w-96 h-32 mb-12 max-lg:hidden relative">
      <div
        id={`yandex-${blockId}`}
        className="rounded-xl size-full z-50 absolute inset-0 flex justify-center items-center"
      />
    </div>
  );
};
