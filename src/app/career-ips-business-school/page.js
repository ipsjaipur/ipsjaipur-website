import { getMetaDataStatic } from "@/_services/seoService";
import MainCareer from "@/components/career/MainCareer";

export async function generateMetadata() {
    return await getMetaDataStatic({
        title: 'Career @ IPS BUSINESS SCHOOL - Top Ranked MBA, BBA & BCA College in Rajasthan',
        description:
            'Career @ IPS BUSINESS SCHOOL - Top Ranked MBA, BBA & BCA College in Rajasthan',
        keywords: 'Career @ IPS BUSINESS SCHOOL - Top Ranked MBA, BBA & BCA College in Rajasthan',
        slug: 'career-ips-business-school',
    });
}

export default function Schlorship() {

    return (
        <>
            <MainCareer />
        </>
    );
}
