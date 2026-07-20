export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getMetaDetails } from "@/_services/seoService";
import MainContact from "@/components/contact/MainContact";

export async function generateMetadata() {
    return await getMetaDetails('contact');
}

export default function ContactPage() {
    return <MainContact />;
}
