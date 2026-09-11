import AboutPageManager from '@/components/dashboard/about-page/AboutPageManager';

export const metadata = {
  title: 'About Page Content | IPS Admin',
  robots: { index: false, follow: false },
};

// In Next.js 15+, searchParams is a Promise — must be awaited
export default async function AboutContentPage({ searchParams }) {
  const params  = await searchParams;
  const section = params?.section || null;
  return <AboutPageManager section={section} />;
}
