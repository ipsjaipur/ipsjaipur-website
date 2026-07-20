export const metadata = {
  title: 'Add Page SEO | IPS Admin',
  robots: { index: false, follow: false },
};

import SeoEditPage from '@/components/dashboard/SeoEditPage';

export default function DashboardSeoNewPage() {
  return <SeoEditPage />;
}
