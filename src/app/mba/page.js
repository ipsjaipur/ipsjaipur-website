export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { notFound } from 'next/navigation';
import { getMetaDetails } from '@/_services/seoService';
import MainMBACourse from '@/components/courses/mba/MainMBACourse';
import { getMBAPageContent } from '@/_services/dataService';

export async function generateMetadata() {
  return await getMetaDetails('mba');
}

export default async function MbaPage() {
  const mbaContent = await getMBAPageContent();

  // If no section data exists in DB at all, show 404
  if (!mbaContent || Object.keys(mbaContent).length === 0) {
    notFound();
  }

  return <MainMBACourse mbaContent={JSON.parse(JSON.stringify(mbaContent))} />;
}
