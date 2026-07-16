import { getMetaDataStatic } from "@/_services/seoService";
import MBALanding from "@/components/LandingPages/MBALanding";

export async function generateMetadata() {
  return await getMetaDataStatic({
    title: 'IPS School Landing Page',
    description:
      '',
    keywords: '',
    slug: "apply-now",
  });
}

export default function AboutUsPage() {
  return (
    <>
      <MBALanding />
    </>
  );
}
