import { getMetaDataStatic } from "@/_services/seoService";
import LifeCampus from "@/components/lifeAtCampus/LifeCampus";

export async function generateMetadata() {
    return await getMetaDataStatic({
        title: 'Top Ranked MBA & BBA and BCA College in Rajasthan | MBA & BBA Jaipur',
        slug: 'life-at-ips',
        description:
            '',
        keywords: '',
    });
}

export default function LifeAtIps() {
    return (
        <>
            <LifeCampus />
        </>
    );
}
