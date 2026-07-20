import { getMetaDetails } from "@/_services/seoService";
import MainAntiRagging from "@/components/courses/anti-ragging/MainAntiRagging";

export async function generateMetadata() {
  return await getMetaDetails('anti-ragging');
}

export default function AntiRaggingPage() {
  return <MainAntiRagging />;
}
