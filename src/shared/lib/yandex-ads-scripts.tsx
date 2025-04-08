import React from "react";

export const YandexAdsScripts = () => {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: "window.yaContextCb = window.yaContextCb || []",
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
              (function(e, x, pe, r, i, me, nt){
                e[i]=e[i]||function(){(e[i].a=e[i].a||[]).push(arguments)},
                me=x.createElement(pe),me.async=1,me.src=r,nt=x.getElementsByTagName(pe)[0],me.addEventListener("error",function(){function cb(t){t=t[t.length-1],"function"==typeof t&&t({flags:{}})};Array.isArray(e[i].a)&&e[i].a.forEach(cb);e[i]=function(){cb(arguments)}}),nt.parentNode.insertBefore(me,nt)})
                (window, document, "script", "https://abt.s3.yandex.net/expjs/latest/exp.js", "ymab");
                
                ymab("metrika.100398709", "setConfig", {enableSetYmUid: true});
                ymab("metrika.100398709", "init"/*, {clientFeatures}, {callback}*/);
                `,
        }}
      />
      <script src="https://yandex.ru/ads/system/context.js" async />
    </>
  );
};
