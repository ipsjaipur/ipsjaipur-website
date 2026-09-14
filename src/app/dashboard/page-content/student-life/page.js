import StudentLifePageManager from '@/components/dashboard/student-life-page/StudentLifePageManager';

export const metadata = {
  title: 'Student Life Page Content | IPS Admin',
  robots: { index: false, follow: false },
};

// In Next.js 15+, searchParams is a Promise — must be awaited
export default async function StudentLifeContentPage({ searchParams }) {
  const params  = await searchParams;
  const section = params?.section || null;
  return <StudentLifePageManager section={section} />;
}
