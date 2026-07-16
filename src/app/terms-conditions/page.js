import { getMetaDataStatic } from "@/_services/seoService";
import ComingSoon from "@/components/common/ComingSoon";


export async function generateMetadata() {
  const metadata = await getMetaDataStatic({
    title: "Terms & Conditions - Top Ranked MBA, BBA & BCA College in Rajasthan | MBA, BBA & BCA Jaipur",
    description: "Terms & Conditions - Top Ranked MBA, BBA & BCA College in Rajasthan | MBA, BBA & BCA Jaipur",
    meta_keywords: "",
    slug: "terms-conditions",
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
