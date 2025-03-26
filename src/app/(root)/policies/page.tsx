import { Suspense } from "react";
import { PoliciesContent } from "./subcomponents/policies-content";

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

const Policies = () => {
  return (
    <Suspense>
      <PoliciesContent />
    </Suspense>
  );
};
export default Policies;
