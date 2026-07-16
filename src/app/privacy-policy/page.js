import { getMetaDataStatic } from "@/_services/seoService";
import ComingSoon from "@/components/common/ComingSoon";


export async function generateMetadata() {
  const metadata = await getMetaDataStatic({
    title: "Privacy Policy - IPS Business School | Data Protection & Privacy",
    description: "Learn about how IPS Business School collects, uses, and protects your personal information. Our privacy policy outlines our commitment to data security.",
    meta_keywords: "privacy policy, data protection, ips privacy, student data security",
    slug: "privacy-policy",
  });

  // Add noindex, nofollow for coming soon pages
  return {
    ...metadata,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

export default function PrivacyPolicyPage() {
  return (
    <ComingSoon
      title="Privacy Policy"
      subtitle="Your Privacy Matters to Us"
      message="We're finalizing our comprehensive privacy policy to ensure transparency about how we handle your data. This page will be available soon with detailed information about our data protection practices."
      showBackButton={true}
    />
  );
}
