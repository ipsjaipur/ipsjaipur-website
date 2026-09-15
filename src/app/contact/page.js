export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { notFound } from 'next/navigation';
import { getMetaDetails } from '@/_services/seoService';
import MainContact from '@/components/contact/MainContact';
import { getContactPageContent } from '@/_services/dataService';

export async function generateMetadata() {
    return await getMetaDetails('contact');
}

export default async function ContactPage() {
    const pageContent = await getContactPageContent();

    // If no section data exists in DB at all, show 404
    if (!pageContent || Object.keys(pageContent).length === 0) {
        notFound();
    }

    return <MainContact pageContent={JSON.parse(JSON.stringify(pageContent))} />;
}
