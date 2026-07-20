export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getMetaDetails } from "@/_services/seoService";
import MainAbout from "@/components/about/MainAbout";

export async function generateMetadata() {
    return await getMetaDetails('about');
}

export default function AboutUsPage() {
    return <MainAbout />;
}
