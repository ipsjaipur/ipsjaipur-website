export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getMetaDetails } from "@/_services/seoService";
import MainBCACourse from "@/components/courses/bca/MainBCACourse";

export async function generateMetadata() {
  return await getMetaDetails('bca');
}

export default function BcaPage() {
  return <MainBCACourse />;
}
