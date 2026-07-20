import { getMetaDetails } from "@/_services/seoService";
import MainCareer from "@/components/career/MainCareer";

export async function generateMetadata() {
    return await getMetaDetails('career-ips-business-school');
}

export default function CareerPage() {
    return <MainCareer />;
}
