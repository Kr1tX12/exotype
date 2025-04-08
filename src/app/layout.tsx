import { Roboto_Mono, Goblin_One } from "next/font/google";
import "../shared/styles/globals.css";
import { Providers } from "@/shared/components/providers";
import NextTopLoader from "nextjs-toploader";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Metadata } from "next";
import { YandexAdsScripts } from "@/shared/lib/yandex-ads-scripts";

const robotoMono = Roboto_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--roboto-mono",
});

const goblinOne = Goblin_One({
  subsets: ["latin"],
  variable: "--goblin-one",
  weight: "400",
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
        <YandexAdsScripts />
      </head>
      <body
        className={`${robotoMono.variable} ${goblinOne.variable} antialiased relative h-screen flex flex-col justify-between`}
      >
        <NextTopLoader
          color="hsl(var(--primary))"
          showSpinner={false}
          crawl={false}
        />
        <Providers>
          {children}
          <SpeedInsights />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
