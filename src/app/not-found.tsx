import { ErrorModal } from "@/widgets/error-modal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found",
};
const NotFound = () => {
  return <ErrorModal title="404" description={`Page  not found`} />;
};

export default NotFound;
