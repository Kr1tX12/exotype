"use client";

import React, { useEffect } from "react";

export const AdBanner = () => {
  useEffect(() => {
    if (window.yaContextCb) {
      if (process.env.NEXT_PUBLIC_SITE_URL !== "https://exotype.fun") return;

      ymab("metrika.100398709", "adv", function (answer: unknown) {
        const getId = ((answer as { getBlockId: unknown }).getBlockId ||
          function (arg: unknown) {
            return arg;
          }) as (prop: string) => string | undefined;

        window.yaContextCb.push(() => {
          Ya.Context.AdvManager.render({
            blockId: getId("R-A-14560878-3"),
            renderTo: "yandex_rtb_R-A-14560878-3",
          });
        });
      });
    }
  }, []);

  return (
    <div className="min-w-56 max-md:hidden">
      <div
        id="yandex_rtb_R-A-14560878-1"
        className="bg-muted/30 rounded-xl size-full"
      />
    </div>
  );
};
