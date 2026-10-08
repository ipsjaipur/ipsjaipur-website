import LifeAtIpsPageManager from '@/components/dashboard/life-at-ips-page/LifeAtIpsPageManager';

export const metadata = {
  title: 'Life at IPS Page Content | IPS Admin',
  robots: { index: false, follow: false },
};

// In Next.js 15+, searchParams is a Promise — must be awaited
export default async function LifeAtIpsContentPage({ searchParams }) {
  const params  = await searchParams;
  const section = params?.section || null;
  return <LifeAtIpsPageManager section={section} />;
}
