import { NotFoundContent } from "@/components/not-found/not-found-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Вернись домой!",
};
const NotFound = () => {
  return <NotFoundContent />;
};

export default NotFound;
