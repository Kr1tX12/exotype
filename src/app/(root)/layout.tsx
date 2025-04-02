import { Navbar } from "@/features/navbar";
import { Footer } from "@/features/footer";
import "../../styles/globals.css";

export const metadata = {
  title: {
    template: "Exotype | %s | BETA",
    default: "Exotype | BETA",
  },
  description:
    "Практикуйся в печати печатая AI тексты, и получай результаты (BETA).",
};

export default async function RootLayout({
  children,
  leadearboardModal,
}: {
  children: React.ReactNode;
  leadearboardModal: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="size-full overflow-y-auto">{children}</main>
      <Footer />
      {leadearboardModal}
    </>
  );
}
