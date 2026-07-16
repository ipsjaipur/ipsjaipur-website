export const metadata = {
  title: 'Edit News | IPS Admin',
  robots: { index: false, follow: false },
};

import NewsEditPageWrapper from '@/components/dashboard/NewsEditPageWrapper';

export default function DashboardNewsEditPage({ params }) {
  return <NewsEditPageWrapper params={params} />;
}
