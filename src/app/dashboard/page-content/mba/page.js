import MBAPageManager from '@/components/dashboard/mba-page/MBAPageManager';

export const metadata = {
  title: 'MBA Page Content | IPS Admin',
  robots: { index: false, follow: false },
};

// In Next.js 15+, searchParams is a Promise — must be awaited
export default async function MBAContentPage({ searchParams }) {
  const params = await searchParams;
  const section = params?.section || null;
  return <MBAPageManager section={section} />;
}
