export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getMetaDetails } from "@/_services/seoService";
import MainEducationLoan from "@/components/courses/education-loan/MainEducationLoan";

export async function generateMetadata() {
  return await getMetaDetails('documents-required-for-education-loan');
}

export default function EducationLoanPage() {
  return <MainEducationLoan />;
}
