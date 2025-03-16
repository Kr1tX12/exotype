import { Roboto_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "../../styles/globals.css";
import { Providers } from "@/components/providers";
import NextTopLoader from "nextjs-toploader";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const robotoMono = Roboto_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--roboto-mono",
});

export const metadata = {
  title: "Exotype | WTF",
  description: "Практикуйся в печати",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${robotoMono.variable} antialiased h-screen flex flex-col justify-between`}
      >
        <NextTopLoader showSpinner={false} crawl={false} />
        <Providers>
          <Navbar />
          <main className="h-full">{children}</main>
          <Footer />
          <SpeedInsights />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
