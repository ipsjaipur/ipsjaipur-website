import { getMetaDetails } from "@/_services/seoService";
import MainStudent from "@/components/student-life/MainStudent";

export async function generateMetadata() {
    return await getMetaDetails('student-life');
}

export default function StudentLife() {
    return <MainStudent />;
}
