import PlacementsPageManager from '@/components/dashboard/placements-page/PlacementsPageManager';

export const metadata = {
  title: 'Placements Page Content | IPS Admin',
  robots: { index: false, follow: false },
};

// In Next.js 15+, searchParams is a Promise — must be awaited
export default async function PlacementsContentPage({ searchParams }) {
  const params = await searchParams;
  const section = params?.section || null;
  return <PlacementsPageManager section={section} />;
}
