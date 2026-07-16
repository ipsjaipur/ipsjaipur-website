import { getMetaDataStatic } from "@/_services/seoService";
import MainFaculty from "@/components/infrastructure/IPSCampus";

export async function generateMetadata() {
    return await getMetaDataStatic({
        title: 'About IPS Campus - Best Business School | Best Management College',
        description:
            'The IPS campus is spread over a large area with lush green lawns and possesses modern infrastructure.  Best Management College In Jaipur',
        keywords: 'best management college, mba college , bba college',
        slug: 'infrastructure',
    });
}


export default function IPSCampus() {
    return (
        <>
            <MainFaculty />
        </>
    );
}
