import { getMetaDataStatic } from "@/_services/seoService";
import MainEducationLoan from "@/components/courses/education-loan/MainEducationLoan";


export async function generateMetadata() {
  return await getMetaDataStatic({
    title: "Top Ranked MBA & BBA and BCA College in Rajasthan | MBA & BBA Jaipur",
    description: "IPS College, Jaipur is among the top colleges in Rajasthan for MBA, BBA, and BCA, recognized as a premier business school shaping practices and transforming careers worldwide",
    meta_keywords: "",
    slug: "documents-required-for-education-loan", // Empty slug for home page
  });
}
export default function EducationLoanPage() {
  return (
    <>
      <MainEducationLoan />
    </>
  );
}
