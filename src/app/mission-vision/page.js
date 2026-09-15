export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { notFound } from 'next/navigation';
import { getMetaDetails } from '@/_services/seoService';
import MainMissionVision from '@/components/missionVision/MainMissionVision';
import { getMissionVisionPageContent } from '@/_services/dataService';

export async function generateMetadata() {
    return await getMetaDetails('mission-vision');
}

export default async function MissionVisionPage() {
    const pageContent = await getMissionVisionPageContent();

    // If no section data exists in DB at all, show 404
    if (!pageContent || Object.keys(pageContent).length === 0) {
        notFound();
    }

    return <MainMissionVision pageContent={JSON.parse(JSON.stringify(pageContent))} />;
}
