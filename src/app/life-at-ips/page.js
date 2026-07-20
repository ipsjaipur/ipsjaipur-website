export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getMetaDetails } from "@/_services/seoService";
import LifeCampus from "@/components/lifeAtCampus/LifeCampus";

export async function generateMetadata() {
    return await getMetaDetails('life-at-ips');
}

export default function LifeAtIps() {
    return <LifeCampus />;
}
