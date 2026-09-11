import BoardOfAdvisorsPageManager from '@/components/dashboard/board-of-advisors-page/BoardOfAdvisorsPageManager';

export const metadata = {
  title: 'Board of Advisors Page Content | IPS Admin',
  robots: { index: false, follow: false },
};

// In Next.js 15+, searchParams is a Promise — must be awaited
export default async function BoardOfAdvisorsContentPage({ searchParams }) {
  const params  = await searchParams;
  const section = params?.section || null;
  return <BoardOfAdvisorsPageManager section={section} />;
}
