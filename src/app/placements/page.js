import { getMetaDataStatic } from "@/_services/seoService";
import MainPlacement from "@/components/placements/MainPlacement";

export async function generateMetadata() {
  return await getMetaDataStatic({
    title: "Placements - Best Placement College in Rajasthan | MBA / BBA/ BCA",
    description: "Transform your career prospects with IPS Business School exceptional placements. Connect with top recruiters and secure your dream job with IPS College",
    meta_keywords: "best placement college in jaipur, top placement college,  mba placement",
    slug: "placements", // Empty slug for home page
  });
}

export default function PlacementsPage() {
  return (
    <>
      <MainPlacement />
    </>
  );
}
