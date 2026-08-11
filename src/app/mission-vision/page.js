export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getMetaDetails } from "@/_services/seoService";
import MainMissionVision from "@/components/missionVision/MainMissionVision";

export async function generateMetadata() {
    return await getMetaDetails('mission-vision');
}

export default function MissionVisionPage() {
    return <MainMissionVision />;
}
