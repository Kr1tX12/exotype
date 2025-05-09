import { Roboto_Mono } from "next/font/google";
import { Navbar } from "@/features/navbar";
import "../../styles/globals.css";
import { Providers } from "@/shared/components/providers";
import NextTopLoader from "nextjs-toploader";

const robotoMono = Roboto_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--roboto-mono",
});

export const metadata = {
  title: "ExoType",
  description: "Практикуйся в печати",
};

// Серверный компонент для получения сессии
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
        </Providers>
      </body>
    </html>
  );
}
