export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { notFound } from 'next/navigation';
import { getMetaDetails } from '@/_services/seoService';
import MainStudent from '@/components/student-life/MainStudent';
import { getStudentLifePageContent } from '@/_services/dataService';

export async function generateMetadata() {
    return await getMetaDetails('student-life');
}

export default async function StudentLifePage() {
    const pageContent = await getStudentLifePageContent();

    // If no section data exists in DB at all, show 404
    if (!pageContent || Object.keys(pageContent).length === 0) {
        notFound();
    }

    return <MainStudent pageContent={JSON.parse(JSON.stringify(pageContent))} />;
}
