"use client";

import React, { useEffect } from "react";

export const AdBanner = () => {
  useEffect(() => {
    if (window.yaContextCb) {
      if (process.env.NEXT_PUBLIC_SITE_URL !== "https://exotype.fun") return;

      window.yaContextCb.push(() => {
        Ya.Context.AdvManager.render({
          blockId: "R-A-14560878-1",
          renderTo: "yandex_rtb_R-A-14560878-1",
        });
      });
    }
  }, []);

  return (
    <div className="h-52 my-8">
      <div id="yandex_rtb_R-A-14560878-1" className="bg-muted/30 rounded-xl size-full" />
    </div>
  );
};
