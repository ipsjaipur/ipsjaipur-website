export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { notFound } from 'next/navigation';
import { getMetaDetails } from '@/_services/seoService';
import MainFaculty from '@/components/infrastructure/IPSCampus';
import { getInfrastructurePageContent } from '@/_services/dataService';

export async function generateMetadata() {
    return await getMetaDetails('infrastructure');
}

export default async function IPSCampus() {
    const pageContent = await getInfrastructurePageContent();

    // If no section data exists in DB at all, show 404
    if (!pageContent || Object.keys(pageContent).length === 0) {
        notFound();
    }

    return <MainFaculty pageContent={JSON.parse(JSON.stringify(pageContent))} />;
}
