export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getMetaDetails } from "@/_services/seoService";
import MainFaculty from "@/components/infrastructure/IPSCampus";

export async function generateMetadata() {
    return await getMetaDetails('infrastructure');
}

export default function IPSCampus() {
    return <MainFaculty />;
}
