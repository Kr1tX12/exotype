import { Roboto_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "../../styles/globals.css";
import { Providers } from "@/components/providers";
import NextTopLoader from 'nextjs-toploader';

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
        <NextTopLoader />
        <Providers>
          <Navbar />
          <main className="h-full">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
