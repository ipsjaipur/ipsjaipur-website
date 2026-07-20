export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getMetaDetails } from "@/_services/seoService";
import MainFaculty from "@/components/faculty/mainFaculty";

export async function generateMetadata() {
    return await getMetaDetails('faculty');
}

export default function FacultyPage() {
    return <MainFaculty />;
}
