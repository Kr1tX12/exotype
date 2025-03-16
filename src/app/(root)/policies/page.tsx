"use client";

import { AnimatedTabs, Tab } from "@/components/ui/animated-tabs";
import React, { useEffect, useState } from "react";
import { PrivacyPolicy } from "./subcomponents/privacy-policy";
import { TermsOfService } from "./subcomponents/terms-of-service";
import { AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

const Policies = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const tabFromUrl = parseInt(searchParams.get("tab") as string) || 0;
    setActiveIndex(tabFromUrl);
  }, [searchParams]);

  const handleTabChange = (index: number) => {
    setActiveIndex(index);
    router.push(`?tab=${index}`);
  };

  return (
    <div className="flex flex-col flex-1 gap-8 justify-center items-center size-full">
      <AnimatedTabs activeIndex={activeIndex} setActiveIndex={handleTabChange}>
        <Tab index={0}>Privacy Policy</Tab>
        <Tab index={1}>Terms of service</Tab>
      </AnimatedTabs>
      <div className="relative size-full container overflow-y-auto px-8 mb-12">
        <AnimatePresence mode="wait">
          {
            {
              "0": <PrivacyPolicy key={0} />,
              "1": <TermsOfService key={1} />,
            }[activeIndex]
          }
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Policies;
