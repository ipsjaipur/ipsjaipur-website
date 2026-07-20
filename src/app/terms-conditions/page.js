import { getMetaDetails } from "@/_services/seoService";
import ComingSoon from "@/components/common/ComingSoon";

export async function generateMetadata() {
  return await getMetaDetails('terms-conditions');
}

export default function TermsAndConditionPage() {
  return (
    <ComingSoon
      title="Terms & Conditions"
      subtitle="Legal Documentation Coming Soon"
      message="We're preparing comprehensive terms and conditions for your review. This page will be available shortly with all the necessary legal information and policies."
      showBackButton={true}
    />
  );
}
