export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getMetaDetails } from "@/_services/seoService";
import MainMBACourse from "@/components/courses/mba/MainMBACourse";

export async function generateMetadata() {
  return await getMetaDetails('mba');
}

export default function MbaPage() {
  return <MainMBACourse />;
}
