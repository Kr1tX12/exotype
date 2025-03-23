"use client";

import React, { useEffect } from "react";

export const AdBanner = () => {
  useEffect(() => {
    if (window.yaContextCb) {
      if (process.env.NEXT_PUBLIC_SITE_URL !== "https://exotype.fun") return;

      window.yaContextCb.push(() => {
        Ya.Context.AdvManager.render({
          blockId: "R-A-14560878-4",
          renderTo: "yandex_rtb_R-A-14560878-4",
        });
      });
    }
  }, []);

  return (
    <div className="w-96 h-32 mb-12 max-lg:hidden relative">
      <div
        id="yandex_rtb_R-A-14560878-4"
        className="rounded-xl size-full z-50 absolute inset-0 flex justify-center items-center"
      />
    </div>
  );
};
