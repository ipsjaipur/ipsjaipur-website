import IpsSutraPageManager from '@/components/dashboard/ips-sutra-page/IpsSutraPageManager';

export const metadata = {
  title: 'IPS Sutra Page Content | IPS Admin',
  robots: { index: false, follow: false },
};

export default async function IpsSutraContentPage({ searchParams }) {
  const params  = await searchParams;
  const section = params?.section || null;
  return <IpsSutraPageManager section={section} />;
}
