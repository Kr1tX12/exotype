import CopyText from "@/shared/components/ui/copy-text";
import { GradientTransition } from "@/shared/components/ui/gradient-transition";
import { motion } from "framer-motion";
import React from "react";

export const PrivacyPolicy = () => {
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
      <GradientTransition direction="top" />
      <div className="z-10 px-4">
        <p className="text-foreground mb-4">
          <strong>Effective Date:</strong> {effectiveDate}
        </p>
        <p className="text-muted-foreground mb-6">
          Welcome to Exotype (exotype.fun). Your privacy is important to us.
          This Privacy Policy explains how we collect, use, and protect your
          data.
        </p>

        <h3 className="text-primary text-xl font-semibold mt-4 mb-2">
          1. Information We Collect
        </h3>
        <p className="text-muted-foreground mb-4">
          When you log in via Google, Discord, or GitHub, we collect the
          following data:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground mb-4">
          <li>Email address</li>
          <li>Name</li>
          <li>Profile icon</li>
          <li>Complete typing statistics</li>
        </ul>

        <h3 className="text-primary text-xl font-semibold mt-4 mb-2">
          2. How We Use Your Data
        </h3>
        <p className="text-muted-foreground mb-4">We utilize your data to:</p>
        <ul className="list-disc pl-6 text-muted-foreground mb-4">
          <li>Provide and enhance our typing training services</li>
          <li>Analyze user activity through Vercel Analytics</li>
          <li>Display ads via the Yandex Advertising Network (RSYA)</li>
        </ul>

        <h3 className="text-primary text-xl font-semibold mt-4 mb-2">
          3. Data Retention and Deletion
        </h3>
        <p className="text-muted-foreground mb-4">
          We store your data until you choose to delete your account. To remove
          your data, navigate to your account settings and click &quot;Delete
          Account.&quot; This action is irreversible.
        </p>

        <h3 className="text-primary text-xl font-semibold mt-4 mb-2">
          4. Third-Party Services
        </h3>
        <p className="text-muted-foreground mb-4">
          We work with third-party services, including:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground mb-4">
          <li>
            <strong className="text-foreground">Vercel Analytics</strong> – for
            tracking website traffic
          </li>
          <li>
            <strong className="text-foreground">
              RSYA (Yandex Advertising Network)
            </strong>{" "}
            – for displaying advertisements
          </li>
        </ul>

        <h3 className="text-primary text-xl font-semibold mt-4 mb-2">
          5. Your Rights
        </h3>
        <p className="text-muted-foreground mb-4">You have the right to:</p>
        <ul className="list-disc pl-6 text-muted-foreground mb-4">
          <li>Request access to your data</li>
          <li>Request deletion of your data</li>
          <li>Contact us for any privacy-related concerns</li>
        </ul>
        <p className="text-muted-foreground mb-4">
          For any inquiries, reach out to{" "}
          <CopyText
            text="exotypecontacts@gmail.com"
            className="text-foreground"
          >
            exotypecontacts@gmail.com
          </CopyText>
          .
        </p>
      </div>

      {/* Градиентный прямоугольник снизу */}
      <GradientTransition direction="bottom" />
    </motion.div>
  );
};
