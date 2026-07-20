import { getMetaDetails } from "@/_services/seoService";
import MainScholar from "@/components/scholarships/MainScholar";

export async function generateMetadata() {
  return await getMetaDetails('scholarships');
}

export default function Scholarships() {
  return <MainScholar />;
}
