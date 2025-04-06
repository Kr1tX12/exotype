import { Policies } from "@/views/policies/policies";
import { Suspense } from "react";

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: Promise<{ tab: string }>;
}) => {
  const tab = (await searchParams).tab;
  return {
    title: { "0": "Privacy Policy", "1": "Terms of service" }[tab],
  };
};

const PoliciesPage = () => {
  return (
    <Suspense>
      <Policies />
    </Suspense>
  );
};
export default PoliciesPage;
