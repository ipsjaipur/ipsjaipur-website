import { getMetaDetails } from "@/_services/seoService";
import MainTermsConditions from "@/components/termsConditions/MainTermsConditions";

export async function generateMetadata() {
  return await getMetaDetails('terms-conditions');
}

export default function TermsAndConditionPage() {
  return <MainTermsConditions />;
}
