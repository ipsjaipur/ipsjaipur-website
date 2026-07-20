import { getMetaDetails } from "@/_services/seoService";
import ComingSoon from "@/components/common/ComingSoon";

export async function generateMetadata() {
  return await getMetaDetails('privacy-policy');
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
