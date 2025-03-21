import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "../../styles/globals.css";

export const metadata = {
  title: {
    template: 'Exotype | %s | BETA',
    default: 'Exotype | BETA'
  },
  description:
    "Практикуйся в печати печатая AI тексты, и получай результаты (BETA).",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="size-full">{children}</main>
      <Footer />
    </>
  );
}
