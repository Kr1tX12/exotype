import CopyText from "@/components/ui/copy-text";
import { motion } from "framer-motion";
import React from "react";

export const TermsOfService = () => {
  const effectiveDate = new Date().toLocaleDateString();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute"
    >
      {/* Градиентный прямоугольник сверху */}
      <div className="sticky top-0 left-0 w-full h-16 bg-gradient-to-b from-background to-transparent"></div>

      <div className="z-10 px-4">
        <p className="text-foreground mb-4">
          <strong>Effective Date:</strong> {effectiveDate}
        </p>
        <p className="text-muted-foreground mb-6">
          By accessing or using Exotype (exotype.fun), you agree to abide by the
          following terms.
        </p>

        <h3 className="text-primary text-xl font-semibold mt-4 mb-2">
          1. Use of the Service
        </h3>
        <p className="text-muted-foreground mb-4">
          Exotype is a free typing training platform with no age restrictions.
          You are welcome to use the site for personal and educational purposes.
        </p>
        <p className="text-muted-foreground mb-4">
          However, full duplication of its functionality or content without
          permission is prohibited.
        </p>

        <h3 className="text-primary text-xl font-semibold mt-4 mb-2">
          2. Prohibited Activities
        </h3>
        <p className="text-muted-foreground mb-4">
          While using Exotype, you agree not to:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground mb-4">
          <li>Cheat or manipulate typing statistics</li>
          <li>Use bots or automated tools to interact with the site</li>
        </ul>

        <h3 className="text-primary text-xl font-semibold mt-4 mb-2">
          3. Account and Data Management
        </h3>
        <p className="text-muted-foreground mb-4">
          You have full control over your account and personal data:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground mb-4">
          <li>
            You may delete your account at any time via the settings page.
          </li>
          <li>
            Your data will be securely stored until you decide to delete your
            account.
          </li>
        </ul>

        <h3 className="text-primary text-xl font-semibold mt-4 mb-2">
          4. No Paid Features
        </h3>
        <p className="text-muted-foreground mb-4">
          Exotype is completely free to use. There are no paid subscriptions or
          premium features.
        </p>

        <h3 className="text-primary text-xl font-semibold mt-4 mb-2">
          5. Changes to Terms
        </h3>
        <p className="text-muted-foreground mb-4">
          We reserve the right to update these terms as needed. Continued use of
          the service after updates constitutes acceptance of the revised terms.
        </p>

        <p className="text-muted-foreground mb-4">
          For any questions, feel free to contact us at{" "}
          <CopyText text="exotypecontacts@gmail.com" className="text-foreground">exotypecontacts@gmail.com</CopyText>.
        </p>
      </div>

      {/* Градиентный прямоугольник снизу */}
      <div className="sticky bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"></div>
    </motion.div>
  );
};
