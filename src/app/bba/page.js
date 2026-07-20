import { getMetaDetails } from "@/_services/seoService";
import MainBBACourse from "@/components/courses/bba/MainBBACourse";

export async function generateMetadata() {
  return await getMetaDetails('bba');
}

export default function BbaPage() {
  return <MainBBACourse />;
}
