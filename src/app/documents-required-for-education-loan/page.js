export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getMetaDetails } from "@/_services/seoService";
import { getEducationLoanPageContent } from "@/_services/dataService";
import MainEducationLoan from "@/components/courses/education-loan/MainEducationLoan";

export async function generateMetadata() {
  return await getMetaDetails('documents-required-for-education-loan');
}

export default async function EducationLoanPage() {
  const pageContent = await getEducationLoanPageContent();

  return <MainEducationLoan pageContent={JSON.parse(JSON.stringify(pageContent))} />;
}
