export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getMetaDetails } from "@/_services/seoService";
import MainPlacement from "@/components/placements/MainPlacement";

export async function generateMetadata() {
  return await getMetaDetails('placements');
}

export default function PlacementsPage() {
  return <MainPlacement />;
}
