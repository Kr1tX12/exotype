import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "../../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const robotoMono = Roboto_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--roboto-mono",
});
export const metadata: Metadata = {
  title: "ExoType",
  description: "Практикуйся в печати",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${robotoMono.variable} antialiased h-screen flex flex-col justify-between`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Navbar />
          <main className="h-full">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
