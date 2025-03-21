import { Roboto_Mono } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "@/components/providers";
import NextTopLoader from "nextjs-toploader";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Metadata } from "next";

const robotoMono = Roboto_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--roboto-mono",
});

export const metadata: Metadata = {
  title: "Exotype | BETA",
  description:
    "Практикуйся в печати печатая AI тексты, и получай результаты (BETA).",
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://exotype.fun"
    ),
    alternates: {
      canonical: "/",
    },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Yandex.RTB загрузчик */}
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
      </head>
      <body
        className={`${robotoMono.variable} antialiased h-screen flex flex-col justify-between`}
      >
        <NextTopLoader showSpinner={false} crawl={false} />
        <Providers>
          {children}
          <SpeedInsights />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
