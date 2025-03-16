"use client";

import React, { useEffect } from "react";

export const AdBanner = () => {
  useEffect(() => {
    if (window.yaContextCb) {
      window.yaContextCb.push(() => {
        Ya.Context.AdvManager.render({
          blockId: "R-A-14560878-1",
          renderTo: "yandex_rtb_R-A-14560878-1",
        });
      });
    }
  }, []);

  return <div id="yandex_rtb_R-A-14560878-1"></div>;
};
