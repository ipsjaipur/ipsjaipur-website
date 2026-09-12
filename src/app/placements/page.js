export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getMetaDetails } from '@/_services/seoService';
import { getHomeSection, getPlacementsPageContent } from '@/_services/dataService';
import MainPlacement from '@/components/placements/MainPlacement';

export async function generateMetadata() {
  return await getMetaDetails('placements');
}

export default async function PlacementsPage() {
  // Shared with home page — slider images + company logos
  const placementsData = await getHomeSection('placements');

  // All placements-page-specific sections in one call
  const placementsPageContent = await getPlacementsPageContent();

  // Serialize to plain JSON to strip Mongoose Date objects (createdAt/updatedAt)
  // which have a toJSON method and cannot be passed directly to Client Components.
  const serialize = (value) => (value ? JSON.parse(JSON.stringify(value)) : null);

  return (
    <MainPlacement
      placementsData={serialize(placementsData)}
      bannerData={serialize(placementsPageContent?.banner)}
      statsData={serialize(placementsPageContent?.stats)}
      updatesData={serialize(placementsPageContent?.updates)}
      resumeBookData={serialize(placementsPageContent?.resumeBook)}
      faqData={serialize(placementsPageContent?.faq)}
      coordinatorData={serialize(placementsPageContent?.coordinator)}
    />
  );
}
