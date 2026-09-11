export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { notFound } from 'next/navigation';
import { getMetaDetails } from '@/_services/seoService';
import MainAbout from '@/components/about/MainAbout';
import { getAboutPageContent } from '@/_services/dataService';

export async function generateMetadata() {
    return await getMetaDetails('about');
}

export default async function AboutUsPage() {
    const aboutContent = await getAboutPageContent();

    // If no section data exists in DB at all, show 404
    if (!aboutContent || Object.keys(aboutContent).length === 0) {
        notFound();
    }

    return <MainAbout aboutContent={JSON.parse(JSON.stringify(aboutContent))} />;
}
