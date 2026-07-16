export const metadata = {
  title: 'Campus News | IPS Admin',
  robots: { index: false, follow: false },
};

import NewsListPage from '@/components/dashboard/NewsListPage';

export default function DashboardNewsPage() {
  return <NewsListPage />;
}
