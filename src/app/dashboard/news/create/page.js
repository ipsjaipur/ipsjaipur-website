export const metadata = {
  title: 'Create News | IPS Admin',
  robots: { index: false, follow: false },
};

import NewsCreatePage from '@/components/dashboard/NewsCreatePage';

export default function DashboardNewsCreatePage() {
  return <NewsCreatePage />;
}
