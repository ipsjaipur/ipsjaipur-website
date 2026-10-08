export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getMetaDetails } from '@/_services/seoService';
import { getLifeAtIpsPageContent } from '@/_services/dataService';
import LifeCampus from '@/components/lifeAtCampus/LifeCampus';

export async function generateMetadata() {
    return await getMetaDetails('life-at-ips');
}

export default async function LifeAtIps() {
    const data = await getLifeAtIpsPageContent();
    const pageContent = JSON.parse(JSON.stringify(data));
    return <LifeCampus pageContent={pageContent} />;
}
