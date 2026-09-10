import BCAPageManager from '@/components/dashboard/bca-page/BCAPageManager';

export const metadata = {
  title: 'BCA Page Content | IPS Admin',
  robots: { index: false, follow: false },
};

export default async function BCAContentPage({ searchParams }) {
  const params  = await searchParams;
  const section = params?.section || null;
  return <BCAPageManager section={section} />;
}
