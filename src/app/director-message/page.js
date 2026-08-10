export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getMetaDetails } from "@/_services/seoService";
import MainDirectorMessage from "@/components/directorMessage/MainDirectorMessage";

export async function generateMetadata() {
    return await getMetaDetails('director-message');
}

export default function DirectorMessagePage() {
    return <MainDirectorMessage />;
}
