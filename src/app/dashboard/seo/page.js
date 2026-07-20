export const metadata = {
  title: 'SEO Management | IPS Admin',
  robots: { index: false, follow: false },
};

import { Suspense } from 'react';
import SeoListPage from '@/components/dashboard/SeoListPage';

export default function DashboardSeoPage() {
  return (
    <Suspense>
      <SeoListPage />
    </Suspense>
  );
}
