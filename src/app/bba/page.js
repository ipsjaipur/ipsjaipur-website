export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { notFound } from 'next/navigation';
import { getMetaDetails } from '@/_services/seoService';
import MainBBACourse from '@/components/courses/bba/MainBBACourse';
import { getBBAPageContent } from '@/_services/dataService';

export async function generateMetadata() {
  return await getMetaDetails('bba');
}

export default async function BbaPage() {
  const bbaContent = await getBBAPageContent();

  // No DB content at all → show 404
  if (!bbaContent || Object.keys(bbaContent).length === 0) {
    notFound();
  }

  return <MainBBACourse bbaContent={JSON.parse(JSON.stringify(bbaContent))} />;
}
