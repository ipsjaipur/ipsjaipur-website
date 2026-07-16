import { getMetaDataStatic } from "@/_services/seoService";
import MainAbout from "@/components/about/MainAbout";

export async function generateMetadata() {
    return await getMetaDataStatic({
        title: 'About Us - Top Ranked MBA, BBA & BCA College in Rajasthan | MBA & BBA Jaipur',
        description:
            'About Us - Top Ranked MBA, BBA & BCA College in Rajasthan | MBA, BBA & BCA Jaipur',
        keywords: 'About Us - Top Ranked MBA & BBA College in Rajasthan | MBA & BBA Jaipur',
        slug: "about",
    });
}

export default function AboutUsPage() {
    return (
        <>
            <MainAbout />
        </>
    );
}
