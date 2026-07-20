import { getMetaDetails } from "@/_services/seoService";
import MainAbout from "@/components/about/MainAbout";

export async function generateMetadata() {
    return await getMetaDetails('about');
}

export default function AboutUsPage() {
    return <MainAbout />;
}
