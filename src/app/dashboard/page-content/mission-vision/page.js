import MissionVisionPageManager from '@/components/dashboard/mission-vision-page/MissionVisionPageManager';

export const metadata = {
  title: 'Mission & Vision Page Content | IPS Admin',
  robots: { index: false, follow: false },
};

// In Next.js 15+, searchParams is a Promise — must be awaited
export default async function MissionVisionContentPage({ searchParams }) {
  const params  = await searchParams;
  const section = params?.section || null;
  return <MissionVisionPageManager section={section} />;
}
