export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { notFound } from 'next/navigation';
import { getMetaDetails } from '@/_services/seoService';
import MainMbaVsPgdm from '@/components/mbaVsPgdm/MainMbaVsPgdm';
import { getMbaVsPgdmPageContent } from '@/_services/dataService';

export async function generateMetadata() {
  return await getMetaDetails('mba-vs-pgdm');
}

export default async function MbaVsPgdmPage() {
  const pageContent = await getMbaVsPgdmPageContent();

  // If no section data exists in DB at all, show 404
  if (!pageContent || Object.keys(pageContent).length === 0) {
    notFound();
  }

  return <MainMbaVsPgdm pageContent={JSON.parse(JSON.stringify(pageContent))} />;
}
