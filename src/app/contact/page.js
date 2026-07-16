import { getMetaDataStatic } from "@/_services/seoService";
import MainContact from "@/components/contact/MainContact";

export async function generateMetadata() {
    return await getMetaDataStatic({
        title: 'Contact - Best MBA, BBA, BCA, B.Com College',
        description:
            'Get in touch with IPS BUSINESS SCHOOL today! Contact our expert team for admissions, program details, and career guidance.',
        keywords: 'best mba college, best bba college, best bca college,best  bcom college',
        slug: 'contact',
    });
}

export default function ContactPage() {
    return (
        <>
            <MainContact />
        </>
    );
}
