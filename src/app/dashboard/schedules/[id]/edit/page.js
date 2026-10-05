export const metadata = {
  title: 'Edit Schedule | IPS Admin',
  robots: { index: false, follow: false },
};

import ScheduleEditPageWrapper from '@/components/dashboard/ScheduleEditPageWrapper';

export default function DashboardScheduleEditPage({ params }) {
  return <ScheduleEditPageWrapper params={params} />;
}
