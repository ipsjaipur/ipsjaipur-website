export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { notFound } from 'next/navigation';
import { getMetaDetails } from '@/_services/seoService';
import MainIpsSutra from '@/components/ipsSutra/MainIpsSutra';
import { getIpsSutraPageContent } from '@/_services/dataService';

export async function generateMetadata() {
  return await getMetaDetails('ips-sutra');
}

export default async function IpsSutraPage() {
  const ipsSutraContent = await getIpsSutraPageContent();

  // If no section data exists in DB at all, show 404
  if (!ipsSutraContent || Object.keys(ipsSutraContent).length === 0) {
    notFound();
  }

  return <MainIpsSutra ipsSutraContent={JSON.parse(JSON.stringify(ipsSutraContent))} />;
}
