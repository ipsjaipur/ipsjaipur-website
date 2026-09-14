import MbaVsPgdmPageManager from '@/components/dashboard/mba-vs-pgdm-page/MbaVsPgdmPageManager';

export const metadata = {
  title: 'MBA vs PGDM Page Content | IPS Admin',
  robots: { index: false, follow: false },
};

// In Next.js 15+, searchParams is a Promise — must be awaited
export default async function MbaVsPgdmContentPage({ searchParams }) {
  const params = await searchParams;
  const section = params?.section || null;
  return <MbaVsPgdmPageManager section={section} />;
}
