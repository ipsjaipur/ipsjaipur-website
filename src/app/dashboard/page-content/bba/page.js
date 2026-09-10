import BBAPageManager from '@/components/dashboard/bba-page/BBAPageManager';

export const metadata = {
  title: 'BBA Page Content | IPS Admin',
  robots: { index: false, follow: false },
};

export default async function BBAContentPage({ searchParams }) {
  const params  = await searchParams;
  const section = params?.section || null;
  return <BBAPageManager section={section} />;
}
