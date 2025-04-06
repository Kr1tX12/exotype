import { Navbar } from "@/features/navbar";
import { Footer } from "@/features/footer";

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
      <main className="size-full overflow-y-auto overflow-x-hidden">{children}</main>
      <Footer />
      {leadearboardModal}
    </>
  );
}
