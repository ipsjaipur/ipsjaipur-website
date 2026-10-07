import IprSeminarPageManager from '@/components/dashboard/ipr-seminar-page/IprSeminarPageManager';

export const metadata = {
  title: 'Seminar Page Content | IPS Admin',
  robots: { index: false, follow: false },
};

// In Next.js 15+, searchParams is a Promise — must be awaited
export default async function IprSeminarContentPage({ searchParams }) {
  const params = await searchParams;
  const section = params?.section || null;
  return <IprSeminarPageManager section={section} />;
}
