import CareerPageManager from '@/components/dashboard/career-page/CareerPageManager';

export const metadata = {
  title: 'Career Page Content | IPS Admin',
  robots: { index: false, follow: false },
};

// In Next.js 15+, searchParams is a Promise — must be awaited
export default async function CareerContentPage({ searchParams }) {
  const params  = await searchParams;
  const section = params?.section || null;
  return <CareerPageManager section={section} />;
}
