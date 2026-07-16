import { getMetaDataStatic } from "@/_services/seoService";
import MainStudent from "@/components/student-life/MainStudent";

export async function generateMetadata() {
    return await getMetaDataStatic({
        title: 'Student Life - Life @ IPS Business School | Best Business School',
        description:
            'IPSâ€™s life is very vivacious as it is situated at very peaceful and very calm city Jaipur popularly known as pink city, here students live their life absolutely.',
        keywords: 'best mba college, best bba college, best bca college',
        slug: 'student-life'
    });
}

export default function StudentLife() {
    return (
        <>
            <MainStudent />
        </>
    );
}
