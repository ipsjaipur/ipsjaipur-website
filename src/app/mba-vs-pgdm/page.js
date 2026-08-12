export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getMetaDetails } from '@/_services/seoService';
import MainMbaVsPgdm from '@/components/mbaVsPgdm/MainMbaVsPgdm';

export async function generateMetadata() {
  return await getMetaDetails('mba-vs-pgdm');
}

export default function MbaVsPgdmPage() {
  return <MainMbaVsPgdm />;
}
