export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { notFound } from 'next/navigation';
import { getMetaDetails } from '@/_services/seoService';
import MainBoardOfAdvisors from '@/components/boardOfAdvisors/MainBoardOfAdvisors';
import { getBoardOfAdvisorsPageContent } from '@/_services/dataService';

export async function generateMetadata() {
  return await getMetaDetails('board-of-advisors');
}

export default async function BoardOfAdvisorsPage() {
  const boardContent = await getBoardOfAdvisorsPageContent();

  // If no section data exists in DB at all, show 404
  if (!boardContent || Object.keys(boardContent).length === 0) {
    notFound();
  }

  return <MainBoardOfAdvisors boardContent={JSON.parse(JSON.stringify(boardContent))} />;
}
