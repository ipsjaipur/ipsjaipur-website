import HomePageManager from '@/components/dashboard/home-page/HomePageManager';

export const metadata = {
  title: 'Home Page Content | IPS Admin',
  robots: { index: false, follow: false },
};

// In Next.js 15+, searchParams is a Promise — must be awaited
export default async function HomeContentPage({ searchParams }) {
  const params = await searchParams;
  const section = params?.section || null;
  return <HomePageManager section={section} />;
}
