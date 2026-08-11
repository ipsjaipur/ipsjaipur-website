export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getMetaDetails } from '@/_services/seoService';
import MainIpsSutra from '@/components/ipsSutra/MainIpsSutra';

export async function generateMetadata() {
  return await getMetaDetails('ips-sutra');
}

export default function IpsSutraPage() {
  return <MainIpsSutra />;
}
