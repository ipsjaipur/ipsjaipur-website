export const metadata = {
  title: 'Edit Page SEO | IPS Admin',
  robots: { index: false, follow: false },
};

import SeoEditPage from '@/components/dashboard/SeoEditPage';

export default async function DashboardSeoEditPage({ params }) {
  const { id } = await params;
  return <SeoEditPage id={id} />;
}
