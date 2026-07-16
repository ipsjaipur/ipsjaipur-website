import { getMetaDataStatic } from "@/_services/seoService";
import MainFaculty from "@/components/faculty/mainFaculty";

export async function generateMetadata() {
    return await getMetaDataStatic({
        title: 'Faculty - Top Ranked MBA, BBA & BCA College in Rajasthan | MBA, BBA & BCA Jaipur',
        description:
            'Faculty - Top Ranked MBA, BBA & BCA College in Rajasthan | MBA, BBA & BCA Jaipur',
        keywords: 'Faculty - Top Ranked MBA, BBA & BCA College in Rajasthan | MBA, BBA & BCA Jaipur',
        slug: 'faculty',
    });
}

export default function FacultyPage() {
    return (
        <>
            <MainFaculty />
        </>
    );
}
