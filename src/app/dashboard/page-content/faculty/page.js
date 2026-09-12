import FacultyPageManager from '@/components/dashboard/faculty-page/FacultyPageManager';

export const metadata = {
  title: 'Faculty Page Content | IPS Admin',
  robots: { index: false, follow: false },
};

// In Next.js 15+, searchParams is a Promise — must be awaited
export default async function FacultyContentPage({ searchParams }) {
  const params  = await searchParams;
  const section = params?.section || null;
  return <FacultyPageManager section={section} />;
}
