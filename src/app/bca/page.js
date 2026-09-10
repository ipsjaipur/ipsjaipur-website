export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { notFound } from 'next/navigation';
import { getMetaDetails } from '@/_services/seoService';
import MainBCACourse from '@/components/courses/bca/MainBCACourse';
import { getBCAPageContent } from '@/_services/dataService';

export async function generateMetadata() {
  return await getMetaDetails('bca');
}

export default async function BcaPage() {
  const bcaContent = await getBCAPageContent();

  // No DB content at all → show 404
  if (!bcaContent || Object.keys(bcaContent).length === 0) {
    notFound();
  }

  return <MainBCACourse bcaContent={JSON.parse(JSON.stringify(bcaContent))} />;
}
