import { Roboto_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "../../styles/globals.css";
import { Providers } from "@/components/providers";
import NextTopLoader from "nextjs-toploader";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { AdBanner } from "@/components/ui/ad-banner";

const robotoMono = Roboto_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--roboto-mono",
});

export const metadata = {
  title: "Exotype | BETA",
  description: "Практикуйся в печати печатая AI тексты, и получай результаты (BETA).",
  other: {
    "yandex-ads": `
      <script>window.yaContextCb=window.yaContextCb||[]</script>
      <script src="https://yandex.ru/ads/system/context.js" async></script>
    `,
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
        <script src="https://yandex.ru/ads/system/context.js" async />
      </head>
      <body
        className={`${robotoMono.variable} antialiased h-screen flex flex-col justify-between`}
      >
        <NextTopLoader showSpinner={false} crawl={false} />
        <Providers>
          <Navbar />
          <main className="h-full">{children}</main>
          <AdBanner />
          <Footer />
          <SpeedInsights />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
