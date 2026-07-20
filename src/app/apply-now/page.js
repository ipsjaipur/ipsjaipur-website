import { getMetaDetails } from "@/_services/seoService";
import MBALanding from "@/components/LandingPages/MBALanding";

export async function generateMetadata() {
  return await getMetaDetails('apply-now');
}

export default function ApplyNowPage() {
  return <MBALanding />;
}
