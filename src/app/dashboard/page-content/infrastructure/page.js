import InfrastructurePageManager from '@/components/dashboard/infrastructure-page/InfrastructurePageManager';

export const metadata = {
  title: 'Infrastructure Page Content | IPS Admin',
  robots: { index: false, follow: false },
};

// In Next.js 15+, searchParams is a Promise — must be awaited
export default async function InfrastructureContentPage({ searchParams }) {
  const params  = await searchParams;
  const section = params?.section || null;
  return <InfrastructurePageManager section={section} />;
}
