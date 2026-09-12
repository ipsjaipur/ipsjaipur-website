export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { notFound } from 'next/navigation';
import { getMetaDetails } from '@/_services/seoService';
import { getFacultyPageContent } from '@/_services/dataService';
import MainFaculty from '@/components/faculty/mainFaculty';

export async function generateMetadata() {
    return await getMetaDetails('faculty');
}

export default async function FacultyPage() {
    const facultyContent = await getFacultyPageContent();

    if (!facultyContent || Object.keys(facultyContent).length === 0) {
        notFound();
    }

    return <MainFaculty facultyContent={JSON.parse(JSON.stringify(facultyContent))} />;
}
