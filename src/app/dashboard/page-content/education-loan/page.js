import EducationLoanPageManager from '@/components/dashboard/education-loan-page/EducationLoanPageManager';

export const metadata = {
  title: 'Education Loan Page Content | IPS Admin',
  robots: { index: false, follow: false },
};

// In Next.js 15+, searchParams is a Promise — must be awaited
export default async function EducationLoanContentPage({ searchParams }) {
  const params  = await searchParams;
  const section = params?.section || null;
  return <EducationLoanPageManager section={section} />;
}
