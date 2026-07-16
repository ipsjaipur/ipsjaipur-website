import { getMetaDataStatic } from "@/_services/seoService";
import MainScholar from "@/components/scholarships/MainScholar";

export async function generateMetadata() {
  return await getMetaDataStatic({
    title: 'Scholarships - Top Ranked MBA, BBA & BCA College in Rajasthan | MBA, BBA & BCA Jaipur',
    description:
      'Scholarships - Top Ranked MBA, BBA & BCA College in Rajasthan | MBA, BBA & BCA Jaipur',
    keywords: 'Scholarships - Top Ranked MBA, BBA & BCA College in Rajasthan | MBA, BBA & BCA Jaipur',
    slug: "scholarships", // Empty slug for home page
  });
}

export default function Schlorship() {
  return (
    <>
      <MainScholar />
    </>
  );
}
